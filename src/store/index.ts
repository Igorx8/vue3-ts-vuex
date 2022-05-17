import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacao';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { EFETUAR_LOGIN } from "./tipo-acoes";
import { DEFINE_USUARIO_LOGADO, DESLOGAR_USUARIO, NOTIFICAR } from "./tipo-mutacoes";
import http from '@/http'
import router from '@/router'
import { IUsuario } from '@/interfaces/IUsuario';
import { anotacao, EstadoAnotacao } from './anotacao';

export interface Estado {
  token: string | null,
  anotacao: EstadoAnotacao,
  notificacoes: Array<INotificacao>
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    anotacao: {
      anotacoes: []
    },
    token: null
  },
  mutations: {
    [DEFINE_USUARIO_LOGADO](state, { accessToken }) {
      if (accessToken) {
        state.token = accessToken;
        router.push('/anotacoes');
      }
    },

    [DESLOGAR_USUARIO](state) {
      state.token = null;
      router.push('/');
    },

    [NOTIFICAR](state, novaNotificacao: INotificacao) {

      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes.pop()
      }, 2000);
    }
  },

  actions: {
    [EFETUAR_LOGIN]({ commit }, usuario: IUsuario) {
      if (usuario.email === 'a@a.com' && usuario.password === '12345') {
        //como não temos um servidor, vamos simular o login buscando um token na nossa fake api
        http.get('login')
          .then(resposta => {
            commit(NOTIFICAR, {
              titulo: 'Login realizado com sucesso',
              texto: 'Bem vindo ao sistema',
              tipo: TipoNotificacao.SUCESSO,
            });
            return commit(DEFINE_USUARIO_LOGADO, resposta.data)
          })
          .catch(() => {
            return commit(NOTIFICAR, {
              titulo: 'Erro',
              texto: 'Não foi possível realizar o login',
              tipo: TipoNotificacao.FALHA,
            })
          });
      }
      else {
        commit(NOTIFICAR, {
          titulo: 'Erro',
          texto: 'Suas credenciais estão inválidas',
          tipo: TipoNotificacao.FALHA,
        })
      }
    }
  },

  getters: {
    usuarioLogado: state => {
      if (!state.token) router.push('/');
      return Boolean(state.token);
    },
  },

  modules: {
    anotacao
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
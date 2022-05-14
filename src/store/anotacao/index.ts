import http from "@/http";
import { IAnotacao } from "@/interfaces/IAnotacao";
import { Estado } from "@/store";
import { Module } from "vuex";
import { ATUALIZAR_ANOTACAO, CADASTRAR_ANOTACAO, CARREGAR_ANOTACOES, DELETAR_ANOTACAO } from "../tipo-acoes";
import { ADICIONA_ANOTACAO, ALTERA_ANOTACAO, DELETA_ANOTACAO, OBTER_ANOTACOES } from "../tipo-mutacoes";


export interface EstadoAnotacao {
    anotacoes: IAnotacao[],
}

export const anotacaoModulo: Module<EstadoAnotacao, Estado> = {
    mutations: {
        [OBTER_ANOTACOES](state, anotacoes: IAnotacao[]) {
            state.anotacoes = anotacoes;
        },
        [ADICIONA_ANOTACAO](state, anotacao: IAnotacao) {
            state.anotacoes.push(anotacao);
        },
        [ALTERA_ANOTACAO](state, anotacao: IAnotacao) {
            const index = state.anotacoes.findIndex(a => a.id === anotacao.id);
            state.anotacoes[index] = anotacao;
        },

        [DELETA_ANOTACAO](state, id: string) {
            const index = state.anotacoes.findIndex(a => a.id === id);
            state.anotacoes.splice(index, 1);
        }
    },

    actions: {
        [CARREGAR_ANOTACOES]({ commit }) {
            http.get('anotacoes')
                .then(resposta => {
                    commit(OBTER_ANOTACOES, resposta.data);
                })
                .catch(() => {
                    commit(OBTER_ANOTACOES, []);
                });
        },

        [CADASTRAR_ANOTACAO]({ commit }, anotacao: IAnotacao) {
            return http.post('/anotacoes', anotacao)
                .then(() => commit(ADICIONA_ANOTACAO, anotacao));
        },

        [ATUALIZAR_ANOTACAO]({ commit }, anotacao: IAnotacao) {
            return http.put(`/anotacoes/${anotacao.id}`, anotacao)
                .then(() => commit(ALTERA_ANOTACAO, { descricao: anotacao }));
        },

        [DELETAR_ANOTACAO]({ commit }, id: string) {
            return http.delete(`/anotacoes/${id}`)
                .then(() => commit(DELETA_ANOTACAO, id));
        }
    }
}
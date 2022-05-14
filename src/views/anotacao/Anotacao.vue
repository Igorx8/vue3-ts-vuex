<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="descricaoAnotacao" class="label">
          <input type="text" class="input" v-model="descricaoAnotacao" id="descricaoAnotacao">
        </label>
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ATUALIZAR_ANOTACAO, CADASTRAR_ANOTACAO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();

    const store = useStore();

    const { notificar } = useNotificador();

    const descricaoAnotacao = ref('');

    if (props.id) {
      const anotacao = store.state.anotacao.anotacoes.find(a => a.id === props.id);
      descricaoAnotacao.value = anotacao?.descricao || '';
    }
    const notificaSucesso = () => {
      descricaoAnotacao.value = '';
      notificar('Nova anotação salva', 'A anotação foi salva com sucesso', TipoNotificacao.SUCESSO);
      router.push('/anotacoes');
    }
    const salvar = () => {
      if (props.id) {
        store.dispatch(ATUALIZAR_ANOTACAO, { id: props.id, descricao: descricaoAnotacao.value });
        notificaSucesso();
      }
      else {
        store.dispatch(CADASTRAR_ANOTACAO, { id: new Date().toISOString(), descricao: descricaoAnotacao.value })
          .then(() => {
            notificaSucesso()
          })
      }
    }
    return {
      descricaoAnotacao,
      salvar
    }
  }
});
</script>
<template>
  <div class="notificacoes">
    <article class="message is-success" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes"
      :key="notificacao.id">

      <div class="message-header">
        {{ notificacao.titulo }}
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'NotificacoesComponent',
  setup() {
    const store = useStore();

    const contexto = {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.ATENCAO]: 'is-warning',
        [TipoNotificacao.FALHA]: 'is-danger',
      }
    return {
      notificacoes: computed(() => store.state.notificacoes),
      contexto
    }
  }
})
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
}
</style>
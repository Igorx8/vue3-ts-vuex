<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter" v-if="estaLogado">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BarraLateral from '@/components/BarraLateral.vue';
import Notificacoes from '@/components/Notificacoes.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'ViewPrincipal',
  components: {
    BarraLateral,
    Notificacoes
  },

  setup() {

    const store = useStore();

    const estaLogado = computed(() => store.getters.usuarioLogado);
    
    return {
      estaLogado
    }
  }
})

</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>

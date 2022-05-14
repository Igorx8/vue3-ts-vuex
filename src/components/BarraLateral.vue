<template>
  <header>
    <h3>
      <img src="../assets/logo.png" alt="">
    </h3>
    <nav class="panel mt-5">
      <ul>
        <li style="color: #42b983"> <button class="button" @click="logout">Logout </button> </li>
        <li>
          <router-link v-for="route in rotas" :to="route.path" :key="route.component">
            <br />
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { rotas } from '@/router';
import { useStore } from '@/store';
import { DESLOGAR_USUARIO } from '@/store/tipo-mutacoes';
export default defineComponent({
  name: 'BarraLateral',
  data() {
    return {
      rotas: computed(() => rotas.filter(r => {
        if (r.meta) {
          return r.meta.public === false
        }
      }))
    }
  },

  setup() {
    const store = useStore();

    const logout = (): void => {
      store.commit(DESLOGAR_USUARIO);
    }

    return {
      logout
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
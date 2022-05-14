<template>
  <div class="anotacoes">
    <h1 class="title">Anotações</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AnotacoesLista',
});
</script>

<style scoped>
.anotacoes {
  padding: 1.25rem
}
</style>
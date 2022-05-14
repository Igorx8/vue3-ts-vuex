<template>
  <div class="anotacoes">
    <h1 class="title">Anotações</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Anotacoes',
});
</script>

<style scoped>
.anotacoes {
  padding: 1.25rem
}
</style>
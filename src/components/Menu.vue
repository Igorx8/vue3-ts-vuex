<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo projeto">
    </h1>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link v-for="route in routes" :to="route.path" :key="route.name"> {{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { routes } from '../router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuView',
  data() {
    return {
      routes: routes
    }
  },
})
</script>
<script setup lang="ts">
import NavMenu from './components/ui/NavMenu.vue';
</script>

<template>
  <v-app>
    <NavMenu />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

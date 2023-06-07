<script setup lang="ts">
import NavMenu from './components/ui/NavMenu.vue';
import Snackbar from './components/ui/Snackbar.vue';
</script>

<template>
  <v-app>
    <NavMenu />
    <v-main>
      <RouterView />
    </v-main>
    <Snackbar />
  </v-app>
</template>

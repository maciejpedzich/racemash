<script setup lang="ts">
import { useAuth } from './composables/useAuth';
import NavMenu from './components/ui/NavMenu.vue';

const { userLoadingFinished } = useAuth();
</script>

<template>
  <v-app>
    <NavMenu />
    <v-main>
      <section
        v-if="!userLoadingFinished"
        class="w-100 h-100 pb-4 d-flex justify-center align-center"
      >
        <v-progress-circular
          :size="100"
          :width="7"
          color="indigo"
          indeterminate
        ></v-progress-circular>
      </section>
      <RouterView v-show="userLoadingFinished" />
    </v-main>
  </v-app>
</template>

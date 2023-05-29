<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from './composables/useAuth';
import { useSnackbar } from './composables/useSnackbar';

import NavMenu from './components/ui/NavMenu.vue';
import Snackbar from './components/ui/Snackbar.vue';

const router = useRouter();
const { loadingUserFinished } = useAuth();
const { showSnackbar } = useSnackbar();

onMounted(async () => {
  await router.isReady();

  const loginStatusHashes = ['#login-error', '#login-success'];
  const routeHash = router.currentRoute.value.hash;

  if (loginStatusHashes.includes(routeHash)) {
    localStorage.removeItem('redirectPath');

    showSnackbar({
      status: routeHash.replace('#login-', '') as 'error' | 'success',
      message:
        routeHash === '#login-error'
          ? 'Failed to log you in'
          : "You're logged in"
    });
  }
});
</script>

<template>
  <v-app>
    <Snackbar />
    <NavMenu />
    <v-main>
      <section
        v-if="!loadingUserFinished"
        class="w-100 h-100 pb-4 d-flex justify-center align-center"
      >
        <v-progress-circular
          :size="120"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </section>
      <RouterView v-show="loadingUserFinished" />
    </v-main>
  </v-app>
</template>

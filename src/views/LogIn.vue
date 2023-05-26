<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useAuth } from '@/composables/useAuth';
import { useSnackbar } from '@/composables/useSnackbar';

const route = useRoute();
const { logIn } = useAuth();
const { showSnackbar } = useSnackbar();

onMounted(() => {
  if (route.hash === '#login-error') {
    showSnackbar({
      color: 'error',
      title: 'Error',
      message: 'Failed to log you in.'
    });
  }
});
</script>

<template>
  <section class="w-100 h-100 d-flex flex-column justify-center align-center">
    <h1 class="text-h3 mb-3">Log in via:</h1>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn color="github" size="large" @click="logIn('github')"
            >GitHub</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn color="discord" size="large" @click="logIn('discord')"
            >Discord</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

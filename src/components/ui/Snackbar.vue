<script lang="ts" setup>
import { useSnackbar } from '@/composables/useSnackbar';

const { visible, color, title, message } = useSnackbar();
</script>

<template>
  <v-snackbar v-model="visible" :color="color" vertical>
    <h6 class="text-h6 mb-1">{{ title }}</h6>
    <p class="text-body-1">{{ message }}</p>
  </v-snackbar>
</template>

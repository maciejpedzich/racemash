<script lang="ts" setup>
import { computed } from 'vue';
import { useSnackbar } from '@/composables/useSnackbar';

const { visible, status, message } = useSnackbar();
const title = computed(() => (status.value === 'error' ? 'Error' : 'Success'));
</script>

<template>
  <v-snackbar v-model="visible" :color="status" vertical>
    <h6 class="text-h6 mb-1">{{ title }}</h6>
    <p class="text-body-1">{{ message }}</p>
  </v-snackbar>
</template>

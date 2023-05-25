<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const themeSwitchIcon = computed(() =>
  theme.global.name.value === 'light'
    ? 'mdi-moon-waxing-crescent'
    : 'mdi-white-balance-sunny'
);

const tooltipText = computed(() =>
  theme.global.name.value === 'light'
    ? 'Switch to dark theme'
    : 'Switch to light theme'
);

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', theme.global.name.value);
};

onMounted(() => {
  const defaultTheme = window.matchMedia?.('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  theme.global.name.value = localStorage.getItem('theme') || defaultTheme;
});
</script>

<template>
  <v-tooltip :text="tooltipText" location="bottom" :open-delay="300">
    <template v-slot:activator="{ props }">
      <v-btn :icon="themeSwitchIcon" @click="toggleTheme" v-bind="props" />
    </template>
  </v-tooltip>
</template>

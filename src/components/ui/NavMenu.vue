<script lang="ts" setup>
import { ref } from 'vue';

import ThemeSwitch from './ThemeSwitch.vue';

const showDrawer = ref(false);
</script>

<template>
  <v-app-bar class="bg-primary text-white">
    <v-app-bar-nav-icon
      @click.stop="showDrawer = !showDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>RaceMash</v-app-bar-title>
    <v-spacer></v-spacer>
    <ThemeSwitch />
  </v-app-bar>
  <v-navigation-drawer v-model="showDrawer" temporary>
    <v-list density="compact" nav>
      <v-list-item title="Home" prepend-icon="mdi-home" link to="/" />
      <v-list-item title="Vote" prepend-icon="mdi-vote" link to="/vote" />
      <v-list-item
        title="Source code"
        prepend-icon="mdi-xml"
        link
        href="https://github.com/maciejpedzich/racemash"
      />
    </v-list>
  </v-navigation-drawer>
</template>

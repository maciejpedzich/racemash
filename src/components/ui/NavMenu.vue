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
      <v-list-item
        title="Home"
        prepend-icon="mdi-home"
        link
        to="/"
      ></v-list-item>
      <v-list-item
        title="Vote"
        prepend-icon="mdi-vote"
        link
        to="/vote"
      ></v-list-item>
      <v-list-item
        title="Log in"
        prepend-icon="mdi-login"
        link
        to="/log-in"
      ></v-list-item>
      <v-list-item title="Log out" prepend-icon="mdi-logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

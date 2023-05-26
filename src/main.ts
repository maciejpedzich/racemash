/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);

app.config.errorHandler = (error) => {
  if (import.meta.env.DEV) {
    console.error(error);
  }
};

app.mount('#app');

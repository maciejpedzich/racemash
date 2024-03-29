/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#d32f2f',
          secondary: '#f44336',
          github: '#2b3137',
          discord: '#5865f2'
        }
      },
      dark: {
        colors: {
          primary: '#b71c1c',
          secondary: '#d50000',
          github: '#2b3137',
          discord: '#5865f2'
        }
      }
    }
  }
});

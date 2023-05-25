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
          primary: '#3f51b5',
          secondary: '#5cbbf6'
        }
      },
      dark: {
        colors: {
          primary: '#1a237e',
          secondary: '#3949ab'
        }
      }
    }
  }
});

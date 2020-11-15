import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#37583D',
        secondary: '#F0F9F4',
        tertiary: '#BAE3CC',
        error: '#FF0000',
        background: '#F0F9F4',
        auxiliary: '#FFFFFF',
      },
    },
    options: {
      customProperties: true
    },
  },
});

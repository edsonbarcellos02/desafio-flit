import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './assets/style.css';

import router from '@/router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { pt } from 'vuetify/locale';
 import { vMaska } from "maska/vue";

import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'pt',
    messages: { pt },
  },
});

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.directive('mask', vMaska)

app.mount('#app')

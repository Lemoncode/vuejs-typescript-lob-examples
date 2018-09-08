import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';

// tslint:disable-next-line:no-var-requires
require('../node_modules/vuetify/dist/vuetify.min.css');

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import mixins from './mixins';
import router from './router';
import store from './store';
import interceptor from './api/interceptors';

Vue.config.productionTip = false;
Vue.mixin(mixins);
interceptor();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

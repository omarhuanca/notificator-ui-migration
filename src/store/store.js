import Vue from 'vue';
import Vuex from 'vuex';
import greettings from './modules/greettings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    greettings,
  },
});

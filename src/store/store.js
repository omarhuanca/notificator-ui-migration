import Vue from 'vue';
import Vuex from 'vuex';
import greettings from './modules/greettings';
import setUpForm from './modules/setUpForm';
import global from './modules/global';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    greettings,
    setUpForm,
    global,
  },
});

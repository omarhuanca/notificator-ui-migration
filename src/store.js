import Vue from 'vue';
import Vuex from 'vuex';
import setUpForm from './store/modules/setUpForm';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setUpForm,
  },
});

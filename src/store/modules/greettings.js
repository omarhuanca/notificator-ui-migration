import api from '../../api/greettings';

// actions
const actions = {
  getGreetting({ commit }) {
    return api.getGreetting((response) => {
      commit('setGreetting', response);
    });
  },
};

// mutations
const mutations = {
  setGreetting(state, response) {
    state.greettings = response;
  },
};

// initial state
const state = {
  greettings: [],
};

export default {
  state,
  actions,
  mutations,
};

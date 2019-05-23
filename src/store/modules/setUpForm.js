// actions
const actions = {
  setUpFormChangeData({ commit }, newData) {
    commit('setData', newData);
  },
};

// mutations
const mutations = {
  setData(state, newData) {
    state.model = newData;
  },
};

// initial state
const state = {
  model: {},
};

export default {
  state,
  actions,
  mutations,
};

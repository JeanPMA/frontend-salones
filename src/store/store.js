import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null,
    // Otros estados que puedas necesitar
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
    // Otras mutaciones que puedas necesitar
  },
  actions: {
    logout({ commit }, router) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRoles');
      commit('clearToken');
      router.push('/');
    },
    // Otras acciones que puedas necesitar
  },
});

export default store;

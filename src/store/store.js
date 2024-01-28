import { reactive } from 'vue';

const state = reactive({
  username: '',
  roles: [],
});

const mutations = {
    setAuthData(state, userData) {
      state.username = userData.username;
      state.roles = userData.roles;

    },
  };

const actions = {
  // Puedes agregar otras acciones relacionadas con la autenticación aquí si es necesario
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
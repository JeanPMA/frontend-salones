import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null,
    sectionToScroll: null,
  },
  mutations: {
    setSectionToScroll(state, sectionId) {
      state.sectionToScroll = sectionId;
    },
    clearSectionToScroll(state) {
      state.sectionToScroll = null;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
    clearFilter(state) {
      localStorage.removeItem('serviciosSeleccionados');
      localStorage.removeItem('mostrarFiltro');
      localStorage.removeItem('SREstadoSeleccionado');
      localStorage.removeItem('mostrarFiltroSR');
      localStorage.removeItem('rolesSeleccionados');
      localStorage.removeItem('mostrarFiltroRol');
      localStorage.removeItem('servicesTipoSRSeleccionados');
      localStorage.removeItem('mostrarFiltroServiceTipoSR');
      localStorage.removeItem('searchTermReservaDueño');
      localStorage.removeItem('searchTermBuzon');
      localStorage.removeItem('searchTermTipoSRAdmin');
      localStorage.removeItem('searchTermUsuarioAdmin');
      localStorage.removeItem('searchTermServicioAdmin');
      localStorage.removeItem('searchTermSalonesAdmin');
      localStorage.removeItem('searchTermSalonesDueño');
      localStorage.removeItem('searchTermSolicitudDueño');
    },
  },
  actions: {
    logout({ commit }, router) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('serviciosSeleccionados');
      localStorage.removeItem('mostrarFiltro');
      localStorage.removeItem('SREstadoSeleccionado');
      localStorage.removeItem('mostrarFiltroSR');
      localStorage.removeItem('rolesSeleccionados');
      localStorage.removeItem('mostrarFiltroRol');
      localStorage.removeItem('servicesTipoSRSeleccionados');
      localStorage.removeItem('mostrarFiltroServiceTipoSR');
      localStorage.removeItem('searchTermReservaDueño');
      localStorage.removeItem('searchTermBuzon');
      localStorage.removeItem('searchTermTipoSRAdmin');
      localStorage.removeItem('searchTermUsuarioAdmin');
      localStorage.removeItem('searchTermServicioAdmin');
      localStorage.removeItem('searchTermSalonesAdmin');
      localStorage.removeItem('searchTermSalonesDueño');
      localStorage.removeItem('searchTermSolicitudDueño');
      commit('clearToken');
      router.push('/');
    },

    refreshFilterServicios({ commit }) {
      commit('clearFilter');
    },
  },
});

export default store;

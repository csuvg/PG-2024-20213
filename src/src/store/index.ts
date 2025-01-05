import { createStore } from 'vuex'

export default createStore({
  state: {
    activeBold: -1,
    activeCircle: -1,
    arrayMed: [],
    userRole: null,
    user: null as any,
  },
  getters: {
    getActiveBold: state => state.activeBold,
    getActiveCircle: state => state.activeCircle,
    getUserRole: state => state.userRole,
    getArrayMed: state => state.arrayMed,
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
  },
  mutations: {
    setActiveBold (state, index) {
      state.activeBold = index;
    },
    setActiveCircle (state, index) {
      state.activeCircle = index;
    },
    setArrayMed (state, arrayMed) {
      state.arrayMed = arrayMed;
    },
    setUserRole (state, role) {
      state.userRole = role;
    },
    setUser (state, user) {
      state.user = user;
    },
    clearUser (state) {
      state.user = null;
    }
  },
  actions: {
    updateActiveBold ({ commit }, index) {
      commit('setActiveBold', index);
    },
    updateActiveCircle ({ commit }, index) {
      commit('setActiveCircle', index);
    },
    updateArrayMed ({ commit }, arrayMed) {
      commit('setArrayMed', arrayMed);
    }, 
    setUserRole ({ commit }, role) {
      commit('setUserRole', role);
    },
    setUser ({ commit }, user) {
      commit('setUser', user);
    },
    clearUser ({ commit }) {
      commit('clearUser');
    }
  },
  modules: {}
});

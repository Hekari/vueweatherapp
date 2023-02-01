import { createStore } from "vuex";

export default createStore({
  state: {
    LoginFlag: false,
  },
  getters: {},
  mutations: {
    SET_LOGIN_FLAG(state, flag) {
      state.LoginFlag = flag;
    },
  },
  actions: {},
  modules: {},
});

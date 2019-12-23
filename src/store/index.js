import Vue from 'vue'
import Vuex from 'vuex'
// import { handleErrors } from '../helpers/ErrorHandler'
import { setTokenInLocalStorage } from '../helpers/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    quotes: []
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user
      setTokenInLocalStorage(payload.token)
    }
  },
  actions: {},
  modules: {}
})

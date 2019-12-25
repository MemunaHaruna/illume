import Vue from 'vue'
import Vuex from 'vuex'
// import { handleErrors } from '../helpers/ErrorHandler'
import {
  setTokenInLocalStorage,
  removeTokenFromLocalStorage
} from '../helpers/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    quotes: []
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user
      if (payload.token) {
        setTokenInLocalStorage(payload.token)
      }
    },
    handleLogout(state) {
      state.currentUser = null
      removeTokenFromLocalStorage()
    }
  },
  getters: {
    currentUser: state => {
      return state.currentUser
    }
  },
  actions: {},
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'
import { handleErrors } from '../helpers/ErrorHandler'
import {
  setTokenInLocalStorage,
  removeTokenFromLocalStorage
} from '../helpers/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    quotes: [],
    paginationData: {}
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
    },
    setQuotes(state, payload) {
      state.quotes = payload.quotes
      state.paginationData = payload.meta.pagination
    }
  },
  getters: {
    currentUser: state => {
      return state.currentUser
    },
    quotes: state => {
      return state.quotes
    },
    paginationData: state => {
      return state.paginationData
    }
  },
  actions: {
    fetchQuotes({ commit }, currentPage) {
      Vue.prototype.$http
        .get('api/quotes/?page=' + currentPage)
        .then(response => {
          commit('setQuotes', response.data)
        })
        .catch(error => {
          console.log(error, 'error fetching quotes')
          handleErrors(error)
        })
    }
  },
  modules: {}
})

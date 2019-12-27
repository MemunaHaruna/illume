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
    paginationData: {},
    topics: [],
    selectedTopicId: ''
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
    },
    setTopics(state, payload) {
      state.topics = payload.tags
    },
    setSelectedTopicId(state, selectedTopicId) {
      state.selectedTopicId = selectedTopicId
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
    },
    topics: state => {
      return state.topics
    },
    selectedTopicId: state => {
      return state.selectedTopicId
    }
  },
  actions: {
    fetchQuotes({ commit }, payload = {}) {
      commit('setSelectedTopicId', payload.tags || '')
      let url = `api/?page=${payload.currentPage || 1}&tags=${payload.tags ||
        ''}&q=${payload.query || ''}`
      Vue.prototype.$http
        .get(url)
        .then(response => {
          commit('setQuotes', response.data)
        })
        .catch(error => {
          console.log(error, 'error fetching quotes')
          handleErrors(error)
        })
    },
    fetchTopics({ commit }) {
      Vue.prototype.$http
        .get('api/tags?per_page=' + 15)
        .then(response => {
          commit('setTopics', response.data)
        })
        .catch(error => {
          console.log(error, 'error fetching topics')
          handleErrors(error)
        })
    }
  },
  modules: {}
})

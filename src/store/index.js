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
    bookmarks: [],
    paginationData: {},
    topics: [],
    selectedTopicId: '',
    newQuote: {},
    createQuoteError: ''
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
      state.quotes = payload
    },
    setBookmarks(state, payload) {
      state.bookmarks = payload
    },
    setPaginationData(state, payload) {
      state.paginationData = payload
    },
    setTopics(state, payload) {
      state.topics = payload.tags
    },
    setSelectedTopicId(state, selectedTopicId) {
      state.selectedTopicId = selectedTopicId
    },
    setNewQuote(state, payload) {
      state.newQuote = payload.quote
    },
    createQuoteError(state, payload) {
      state.createQuoteError = payload.error
    }
  },
  getters: {
    currentUser: state => {
      return state.currentUser
    },
    quotes: state => {
      return state.quotes
    },
    bookmarks: state => {
      return state.bookmarks
    },
    paginationData: state => {
      return state.paginationData
    },
    topics: state => {
      return state.topics
    },
    selectedTopicId: state => {
      return state.selectedTopicId
    },
    newQuote: state => {
      return state.newQuote
    },
    createQuoteError: state => {
      return state.createQuoteError
    }
  },
  actions: {
    fetchQuotes({ commit }, payload = {}) {
      commit('setSelectedTopicId', payload.tags || '')
      let defaultUrl = 'api'
      let url = `${payload.url || defaultUrl}/?page=${payload.currentPage ||
        1}&tags=${payload.tags || ''}&q=${payload.query || ''}`
      Vue.prototype.$http
        .get(url)
        .then(response => {
          commit('setQuotes', response.data.quotes)
          commit('setPaginationData', response.data.meta.pagination)
        })
        .catch(error => {
          console.log(error, 'error fetching quotes')
          handleErrors(error)
        })
    },
    fetchBookmarks({ commit }, payload = {}) {
      commit('setSelectedTopicId', payload.tags || '')
      let url = `${payload.url}/?page=${payload.currentPage || 1}`
      Vue.prototype.$http
        .get(url)
        .then(response => {
          commit('setBookmarks', response.data.bookmarks)
          commit('setPaginationData', response.data.meta.pagination)
        })
        .catch(error => {
          console.log(error, 'error fetching bookmarks')
          handleErrors(error)
        })
    },
    fetchTopics({ commit }) {
      Vue.prototype.$http
        .get('api/tags')
        .then(response => {
          commit('setTopics', response.data)
        })
        .catch(error => {
          console.log(error, 'error fetching topics')
          handleErrors(error)
        })
    },
    createNewQuote({ commit }, payload) {
      if (payload.tag_ids.length > 0) {
        let tempTags = []
        payload.tag_ids.forEach(item => {
          tempTags.push(item.id)
        })
        payload.tag_ids = tempTags
      }
      if (payload.access) {
        payload.access = Number(payload.access)
      }
      Vue.prototype.$http
        .post('api/quotes', payload)
        .then(response => {
          commit('setNewQuote', response.data)
        })
        .catch(error => {
          commit('createQuoteError', error)
          handleErrors(error)
        })
    }
  },
  modules: {}
})

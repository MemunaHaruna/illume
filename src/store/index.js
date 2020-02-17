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
    createQuoteError: '',
    newBookmark: {},
    createBookmarkError: '',
    deleteBookmarkSuccessMessage: '',
    deleteBookmarkError: '',
    deleteQuoteError: '',
    loading: true
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user
      if (payload.token) {
        setTokenInLocalStorage(payload.token)
        Vue.prototype.$http.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${payload.token}`
      }
    },
    handleLogout() {
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
    },
    setNewBookmark(state, payload) {
      state.newBookmark = payload.bookmark
    },
    createBookmarkError(state, payload) {
      state.createBookmarkError = payload.error
    },
    deleteBookmarkSuccess(state, payload) {
      state.deleteBookmarkSuccessMessage = payload.message
    },
    deleteBookmarkError(state, payload) {
      state.deleteBookmarkError = payload.error
    },
    deleteQuoteError(state, payload) {
      state.deleteQuoteError = payload.error
    },
    loading(state, status) {
      state.loading = status
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
    },
    newBookmark: state => {
      return state.newBookmark
    },
    createBookmarkError: state => {
      return state.createBookmarkError
    },
    deleteBookmarkSuccessMessage: state => {
      return state.deleteBookmarkSuccessMessage
    },
    deleteBookmarkError: state => {
      return state.deleteBookmarkError
    },
    deleteQuoteError: state => {
      return state.deleteQuoteError
    },
    loading: state => {
      return state.loading
    }
  },
  actions: {
    handleLogout({ commit, state, dispatch }) {
      state.currentUser = null
      state.quotes = []
      Vue.prototype.$http.defaults.headers.common['Authorization'] = null
      commit('handleLogout')
      dispatch('fetchQuotes', { url: 'api' })
    },
    fetchQuotes({ commit, state }, payload = {}) {
      commit('setSelectedTopicId', payload.tags || '')
      let defaultUrl =
        state.currentUser && state.currentUser.id ? 'api/quotes' : 'api'

      let url = `${payload.url || defaultUrl}/?page=${payload.currentPage ||
        1}&tags=${payload.tags || ''}&q=${payload.query || ''}`
      commit('loading', true)
      Vue.prototype.$http
        .get(url)
        .then(response => {
          commit('setQuotes', response.data.quotes)
          commit('setPaginationData', response.data.meta.pagination)
          commit('loading', false)
        })
        .catch(error => {
          console.log(error, 'error fetching quotes')
          handleErrors(error)
          commit('loading', false)
        })
    },
    fetchBookmarks({ commit }, payload = {}) {
      commit('setSelectedTopicId', payload.tags || '')
      let url = `${payload.url}/?page=${payload.currentPage || 1}`
      commit('loading', true)
      Vue.prototype.$http
        .get(url)
        .then(response => {
          commit('setBookmarks', response.data.bookmarks)
          commit('setPaginationData', response.data.meta.pagination)
          commit('loading', false)
        })
        .catch(error => {
          console.log(error, 'error fetching bookmarks')
          handleErrors(error)
          commit('loading', false)
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
    createNewQuote({ commit, state, dispatch }, payload) {
      let defaultUrl =
        state.currentUser && state.currentUser.id ? 'api/quotes' : 'api'
      let quotesUrl =
        payload.vm.$route.name == 'profile'
          ? 'api/quotes/personal_quotes'
          : defaultUrl
      let formData = payload.formData
      if (formData.tag_ids.length > 0) {
        let tempTags = []
        formData.tag_ids.forEach(item => {
          tempTags.push(item.id)
        })
        formData.tag_ids = tempTags
      }
      if (formData.access) {
        formData.access = Number(formData.access)
      }
      // commit('loading', true)
      Vue.prototype.$http
        .post('api/quotes', formData)
        .then(response => {
          commit('setNewQuote', response.data)
          dispatch('fetchQuotes', { url: quotesUrl })
          payload.vm.$bvToast.toast('Successfully added new quote', {
            autoHideDelay: 1000,
            variant: 'success',
            noCloseButton: true
          })
        })
        .catch(error => {
          commit('createQuoteError', error)
          handleErrors(error)
          payload.vm.$bvToast.toast('Error while creating a quote', {
            autoHideDelay: 1000,
            variant: 'danger',
            noCloseButton: true
          })
        })
      // commit('loading', false)
    },
    createBookmark({ commit, state, dispatch }, payload = {}) {
      // commit('loading', true)
      Vue.prototype.$http
        .post(payload.url, { quote_id: payload.quote_id })
        .then(response => {
          commit('setNewBookmark', response.data)
          dispatch('fetchBookmarks', {
            url: `api/users/${state.currentUser.id}/bookmarks`
          })
          payload.vm.$bvToast.toast('Successfully added new bookmark', {
            autoHideDelay: 1000,
            variant: 'success',
            noCloseButton: true
          })
        })
        .catch(error => {
          commit('createBookmarkError', error)
          handleErrors(error)
          payload.vm.$bvToast.toast('Error creating bookmark', {
            autoHideDelay: 1000,
            variant: 'danger',
            noCloseButton: true
          })
        })
      // commit('loading', true)
    },
    deleteBookmark({ commit, state, dispatch }, payload) {
      commit('loading', true)
      Vue.prototype.$http
        .delete(payload.url)
        .then(response => {
          commit('deleteBookmarkSuccess', response.data)
          dispatch('fetchBookmarks', {
            url: `api/users/${state.currentUser.id}/bookmarks`
          })
          payload.vm.$bvToast.toast('Successfully deleted bookmark', {
            autoHideDelay: 1000,
            variant: 'success',
            noCloseButton: true
          })
        })
        .catch(error => {
          commit('deleteBookmarkError', error)
          handleErrors(error)
          payload.vm.$bvToast.toast('Error deleting bookmark', {
            autoHideDelay: 1000,
            variant: 'danger',
            noCloseButton: true
          })
        })
      commit('loading', false)
    },
    editQuote({ commit, state, dispatch }, payload) {
      let defaultUrl =
        state.currentUser && state.currentUser.id ? 'api/quotes' : 'api'
      let quotesUrl =
        payload.vm.$route.name == 'profile'
          ? 'api/quotes/personal_quotes'
          : defaultUrl
      let formData = payload.formData
      if (formData.tag_ids.length > 0) {
        let tempTags = []
        formData.tag_ids.forEach(item => {
          tempTags.push(item.id)
        })
        formData.tag_ids = tempTags
      }
      if (formData.access) {
        formData.access = Number(formData.access)
      }
      // commit('loading', true)
      Vue.prototype.$http
        .put(`api/quotes/${payload.quote_id}`, formData)
        .then(response => {
          commit('setNewQuote', response.data)
          dispatch('fetchQuotes', { url: quotesUrl })
          payload.vm.$bvToast.toast('Successfully edited quote', {
            autoHideDelay: 1000,
            variant: 'success',
            noCloseButton: true
          })
        })
        .catch(error => {
          commit('createQuoteError', error)
          handleErrors(error)
          payload.vm.$bvToast.toast('Error while editing quote', {
            autoHideDelay: 1000,
            variant: 'danger',
            noCloseButton: true
          })
        })
      // commit('loading', false)
    },
    deleteQuote({ commit, state, dispatch }, payload) {
      let defaultUrl =
        state.currentUser && state.currentUser.id ? 'api/quotes' : 'api'
      let quotesUrl =
        payload.vm.$route.name == 'profile'
          ? 'api/quotes/personal_quotes'
          : defaultUrl
      // commit('loading', true)
      Vue.prototype.$http
        .delete(payload.url)
        .then(() => {
          dispatch('fetchQuotes', { url: quotesUrl })
          payload.vm.$bvToast.toast('Successfully deleted quote', {
            autoHideDelay: 1000,
            variant: 'success',
            noCloseButton: true
          })
        })
        .catch(error => {
          commit('deleteQuoteError', error)
          handleErrors(error)
          payload.vm.$bvToast.toast('Error while deleting quote', {
            autoHideDelay: 1000,
            variant: 'danger',
            noCloseButton: true
          })
        })
      // commit('loading', true)
    }
  },
  modules: {}
})

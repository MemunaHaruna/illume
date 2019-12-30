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
    deleteQuoteError: ''
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
    createNewQuote({ commit, dispatch }, payload) {
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
      Vue.prototype.$http
        .post('api/quotes', formData)
        .then(response => {
          commit('setNewQuote', response.data)
          dispatch('fetchQuotes')
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
    },
    createBookmark({ commit, state, dispatch }, payload = {}) {
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
    },
    deleteBookmark({ commit, state, dispatch }, payload) {
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
    },
    editQuote({ commit, dispatch }, payload) {
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

      Vue.prototype.$http
        .put(`api/quotes/${payload.quote_id}`, formData)
        .then(response => {
          commit('setNewQuote', response.data)
          dispatch('fetchQuotes')
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
    },
    deleteQuote({ commit, dispatch }, payload) {
      Vue.prototype.$http
        .delete(payload.url)
        .then(() => {
          dispatch('fetchQuotes')
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
    }
  },
  modules: {}
})

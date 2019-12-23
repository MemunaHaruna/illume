import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import ActionCableVue from 'actioncable-vue'

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// instance.defaults.headers.common['Authorization'] =
//   'Bearer' + localStorage.getItem('IllumeToken')

Vue.prototype.axios = instance
Vue.prototype.$http = instance

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: process.env.VUE_APP_API_SOCKET_URL,
  connectImmediately: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

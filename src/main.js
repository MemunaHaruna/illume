import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import ActionCableVue from "actioncable-vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import SocialSharing from "vue-social-sharing";
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFacebook);
library.add(faTwitter);
library.add(faGoogle);
library.add(faWhatsapp);
library.add(fas);
library.add(far);
// library.add(faUserSecret)
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("social-sharing", SocialSharing);
Vue.config.productionTip = false;

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("IllumeJwtToken");

Vue.prototype.axios = instance;
Vue.prototype.$http = instance;

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: "error",
  connectionUrl: process.env.VUE_APP_API_SOCKET_URL,
  connectImmediately: true
});
Vue.use(BootstrapVue);
Vue.use(SocialSharing);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

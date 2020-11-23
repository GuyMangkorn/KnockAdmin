import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false


window.axios = require('axios')

Vue.config.productionTip = false
Vue.use(firebase)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
  vuetify,
  router:routes
}).$mount('#app')

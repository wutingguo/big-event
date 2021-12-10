import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.css'
import '@/utils/element'
import axios from '@/utils/requst'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.css'
import '@/utils/element'
import axios from '@/utils/requst'
import dayjs from 'dayjs'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.filter('flDate', (value, str = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(str)
})
Vue.use(dayjs)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

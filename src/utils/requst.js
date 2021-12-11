import axios from 'axios'
// import vue from 'vue'
import router from '@/router'
import { Loading } from 'element-ui'
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// eslint-disable-next-line no-unused-vars
let loading
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  if (config.url.startsWith('/my')) {
    config.headers.Authorization = localStorage.getItem('big-event')
  }
  loading = Loading.service({
    lock: true,
    text: '玩命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  loading.close()
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.data.code === 1 && error.response.status === 401) {
    localStorage.removeItem('big-event')
    alert('身份认证失败,请重新登录')
    router.push('/login')
  }
  loading.close()

  return Promise.reject(error)
})
export default axios

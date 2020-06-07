import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '../store/index'
import i18n from '../assets/i18n/i18n'
import router from '../router/index'

const options = {
  fullscreen: true,
  text: '加载中...',
  background: 'rgba(255, 255, 255, 0.5)',
  lock: true
}

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:3000/blog'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'http://127.0.0.1:3000/blog'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://127.0.0.1:3000/blog'
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    const i18nMsg = i18n.messages[i18n.locale]
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          toLogin()
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error(i18nMsg.global.loginExpired)
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            toLogin()
          }, 1000)
          break
        // 404请求不存在
        case 404:
          Message.error(i18nMsg.global.notExist)
          break
        // 其他错误，直接抛出错误提示
        default:
          Message.error(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)

// const base = 'http://127.0.0.1:3000'

export function PostData (url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    // loadingInstance变量
    let loadingInstance = null
    if (isLoading) loadingInstance = Loading.service(options)
    // 获取当前国际化对象
    const i18nMsg = i18n.messages[i18n.locale]
    axios
      .post(url, data)
      .then(response => {
        // 关闭加载对话框
        loadingInstance && loadingInstance.close()
        if (response.data.code === -1) {
          Message.error(response.data.error_msg) // 发生异常
        }
        resolve(response)
      })
      .catch(err => {
        // 关闭加载对话框
        loadingInstance && loadingInstance.close()
        Message.error(i18nMsg.global.errInfo)
        reject(err)
      })
  })
}

export function GetData (url, data, isLoading = true) {
  return new Promise((resolve, reject) => {
    // loadingInstance变量
    let loadingInstance = null
    if (isLoading) loadingInstance = Loading.service(options)
    // 获取当前国际化对象
    const i18nMsg = i18n.messages[i18n.locale]
    axios
      .get(url, {
        params: data
      })
      .then(response => {
        // 关闭加载对话框
        loadingInstance && loadingInstance.close()
        resolve(response)
      })
      .catch(err => {
        // 关闭加载对话框
        loadingInstance && loadingInstance.close()
        Message.error(i18nMsg.global.errInfo)
        reject(err)
      })
  })
}

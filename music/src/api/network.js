import axios from 'axios'
import Vue from 'vue'
 

//全局配置
axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.baseURL = 'http://192.168.1.102:3000/'

axios.defaults.timeout = 5000

let count = 0

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config;
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
      Vue.hiddenLoading()
  }
  // Vue.hiddenLoading()
  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error);
});

//封装get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {//一次性发送很多请求
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}



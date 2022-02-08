import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
import './assets/css/base.scss'

import VueLazyload from 'vue-lazyload'

import Loading from './plugin/loading/index'
Vue.use(VueLazyload, {
  //通过配置loading来设置图片还未加载好之前的占位图片
  loading:require('./assets/images/loading.png')
})

Vue.use(Loading, {
  title: '等待'
})

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

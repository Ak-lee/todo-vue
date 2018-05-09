import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router.js'
import createStore from './store/store.js'

Vue.use(VueRouter)
Vue.use(Vuex)
const store = createStore()
const router = createRouter()
router.beforeEach()

new Vue({
  router,
  store,
  render: (h) => h(App) // h 即createApp 这里声明组件渲染出来的是app的内容
}).$mount('#root') // 挂载到root上面

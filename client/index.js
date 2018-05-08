import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router.js'

Vue.use(VueRouter)
const router = createRouter()
new Vue({
  router,
  render: (h) => h(App) // h 即createApp 这里声明组件渲染出来的是app的内容
}).$mount('#root') // 挂载到root上面

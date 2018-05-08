import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//   routers
// })
//
// export default router

export default () => {
  return new Router({
    routes,
    mode: 'history'
    // base: '/base/'
  })
}

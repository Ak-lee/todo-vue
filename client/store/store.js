import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations'
import getters from './getters/getters'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters
  })

  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations',
      './getters/getters'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newGetters = require('./getters/getters.js').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters
      })
    })
  }
  return store
}

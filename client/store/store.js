import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations'
import getters from './getters/getters'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters
  })
}

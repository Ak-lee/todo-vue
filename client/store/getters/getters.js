export default {
  // 完全可以把getters理解为组件内的computed
  // getters 可以方便的生成一些我们可以直接在应用里使用的数据
  // 比如我们从后端拿到的一些数据需要组装一下才方便使用，同时有不是只在一个组件里面使用
  // 这种时候就需要用到 getters
  fullName (state) {
    return `${state.firstName} 123 ${state.lastName}`
  }
}

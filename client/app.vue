<template>
    <div id="app">
        <div id="cover">
            <Header></Header>
            <!--<todo></todo>-->
            <div>{{fullName}}</div>
            <router-link to="/app">app</router-link>
            <router-link to="/login">login</router-link>
            <router-view />
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from './layout/header.vue'
    import Footer from './layout/footer.jsx'
    import Todo from './views/todo/todo.vue'
    import {mapGetters} from 'vuex'
    export default {
      components: {
        Header,
        Footer,
        Todo
      },
      computed: {
        // fullName () {
        //   return this.$store.getters.fullName
        // }
        ...mapGetters({fullName: 'fullName'})
      }
    }
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
}
</style>

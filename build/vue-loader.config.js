module.exports=(isDev)=>{
    return {
        preserveWhitepace:true,
        extractCSS:!isDev,
        cssModules:{
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            // cssModules 在.vue文件中使用的语法是：在引用class处写 :class="$style.你的样式名"
            // 在style标签中为 <style lang="stylus" module></style>
            // cssModules 功能其实和 scoped 大同小异。
            camelCase:true,
        },
    }
}
<template>
    <div class="app">

        <van-nav-bar v-show="isShow" :title="title" left-text="返回" left-arrow
            @click-left="$router.back()" />
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '好物',
            isShow: false
        }
    },
    watch: {
        '$route':{
              handler: function (newRoute, oldRoute) {
                  let {title,isIndexShow} = newRoute.meta;
                  this.title = title;
                  this.isShow = !isIndexShow;
              },
            //    immediate: true
        }
    }
}
</script>
<style lang="scss">
.app {
    min-width: 320px;
    max-width: 750px;
    margin: auto;
}
</style>


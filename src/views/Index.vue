<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" dot to="/home/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5" to="/home/user">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    '$route': {
      handler: function (newRoute, oldRoute) {
        let { name } = newRoute.meta;
        const MapObj = {
          'Home': 0,
          'Cart': 1,
          'User': 2
        }
        this.active = MapObj[name]
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
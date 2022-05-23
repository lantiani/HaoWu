<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item :to="item.url" v-for="item in icons" :key="item.active">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import iconHome from '../assets/images/icon-home.png';
import iconHomeA from '../assets/images/icon-home-a.png';
import iconCart from '../assets/images/icon-cart.png';
import iconCartA from '../assets/images/icon-cart-a.png';
import iconMime from '../assets/images/icon-mime.png';
import iconMimeA from '../assets/images/icon-mime-a.png';
export default {
  data() {
    return {
      active: 0,
      icons: [
        {
          active: iconHome,
          inactive: iconHomeA,
          text:'首页',
          url:'/home/index'
        },
        {
          active: iconCart,
          inactive: iconCartA,
          text:'购物车',
          url:'/home/cart'
        },
        {
          active: iconMime,
          inactive: iconMimeA,
          text:'个人中心',
          url:'/home/user'
        },
      ]
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

<style lang="scss" scoped>
.van-tabbar {
  // border-top-left-radius: 20px;
  // border-top-right-radius: 20px;
  overflow: hidden;
  // .van-tabbar-item {
  //   // background: rgb(234, 232, 232);
  // }

}
</style>
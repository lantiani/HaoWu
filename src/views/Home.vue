<template>
  <div class="home">
    <router-view></router-view>
    <!-- <router-link to="/goods">商品列表窝</router-link>
    <router-link to="/order">订单列表窝</router-link> -->
    <div class="search">
      <div class="logWarp">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <van-search v-model="value" shape="round" @focus="$router.push('/home/index/search')" placeholder="请输入搜索关键词" />
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeData" :key="item.id">
        <img class="swipeImg" :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="4">
      <van-grid-item v-for="item in gridData" :key="item.menu" :to="item.to">
        <van-image :src="item.src" />
        <span class="gridText">{{ item.text }}</span>
      </van-grid-item>
    </van-grid>

    <van-divider>商品推荐</van-divider>

    <!-- 商品列表 -->
    <div class="goodsWrap">
      <goods-list v-for="item in goodsData" :key="item.id" :data="item"  @goodsDetail="getGoodsId" />
    </div>

    <!-- 回到顶部 -->
    <back-top />
  </div>
</template>

<script>
import { fetchSwipe, fetchGoods } from '@api/home.js';
import backTop from '@/components/BackTop.vue'
import GoodsList from '@/components/GoodsList.vue'
import src1 from '@/assets/images/1.png';
import src2 from '@/assets/images/2.png';
import src3 from '@/assets/images/3.png';
import src4 from '@/assets/images/4.png';
import src5 from '@/assets/images/5.png';
import src6 from '@/assets/images/6.png';
import src7 from '@/assets/images/7.png';
import src8 from '@/assets/images/8.png';
export default {
  data() {
    return {
      value: '',
      page: 1,
      limit: 10,
      swipeData: [],
      gridData: [
        { src: src1, text: '乐淘超市', to: '/goods' },
        { src: src2, text: '乐淘超市', to: '/goods' },
        { src: src3, text: '乐淘超市', to: '/goods' },
        { src: src4, text: '乐淘超市', to: '/goods' },
        { src: src5, text: '乐淘超市', to: '/goods' },
        { src: src6, text: '乐淘超市', to: '/goods' },
        { src: src7, text: '乐淘超市', to: '/goods' },
        { src: src8, text: '乐淘超市', to: '/goods' },
      ],
      goodsData: []
    }
  },
  mounted() {
    this._fetchSwipe();
    this._fetchGoods();
  },
  methods: {
    async _fetchSwipe() {
      let { message } = await fetchSwipe();
      this.swipeData = message;
    },

    async _fetchGoods() {
      let { message } = await fetchGoods(this.page, this.limit);
      this.goodsData = message;
    },
    getGoodsId(data,event) {
        this.$router.push(`/goodsDetail/${data}`)
    }
  },
  components: {
    backTop,
    GoodsList
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.home {
  .search {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    background: #fff;

    .logWarp {
      width: 50px;
      height: 54px;
      // background: rgb(255, 246, 179);
      padding: 0px 5px;

      img {
        width: 100%;
        height: 100%;
        transform: scaleY(.6);
      }
    }
  }

  .van-search {
    flex: 1;
  }

  .my-swipe {
    padding-top: 60px;

    .van-swipe-item {
      height: 200px;
      display: flex;
      justify-content: center;

      .swipeImg {
        border-radius: 10px;
        overflow: hidden;
        width: 96%;
        height: 100%;
      }
    }
  }

  .van-grid {

    .van-grid-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);

      .van-image {
        width: 50%;
      }

      .gridText {
        font-size: 14px;
        color: #666;
        margin-top: 6px;
      }
    }
  }

  // 商品列表数据
  .goodsWrap {
    @include flex-around-center;
    @include goodsWrap
  }
}
</style>
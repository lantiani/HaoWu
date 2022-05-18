<template>
  <div class="home">
    <router-view></router-view>
    <!-- <router-link to="/goods">商品列表窝</router-link>
    <router-link to="/order">订单列表窝</router-link> -->
    <div class="search">
      <div class="imgWarp">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <van-search v-model="value" background="rgb(255, 246, 179)" shape="round" placeholder="请输入搜索关键词" />
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeData" :key="item.id">
        <img class="swipeImg" :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="4">
      <van-grid-item v-for="item in gridData" :key="item.menu">
        <van-image :src="item.src" />
        <span class="gridText">{{ item.text }}</span>
      </van-grid-item>
    </van-grid>

    <van-divider>商品推荐</van-divider>

    <!-- 商品列表 -->
    <div class="goodsWrap">
      <a href="" class="goodsItem" v-for="item in goodsData" :key="item.id">
        <div class="goodsImgWrap">
          <img class="goodsImg" v-lazy="item.img_url" alt="">
        </div>
        <div class="goodsPadding">
          <p class="goodsText">{{ item.zhaiyao }}</p>
          <div class="goodsPrice">
            <span style="font-size:14px">￥</span>
            <span>{{ item.sell_price }}</span>
            <span style="font-size:14px">.00</span>
          </div>
          <div class="goodsComments">
            {{ item.buy }}条评论
          </div>
        </div>
      </a>
    </div>
    <back-top />
  </div>
</template>

<script>
import { fetchSwipe, fetchGoods } from '../api/home.js';
import backTop from '../components/BackTop.vue'
import src1 from '../assets/images/1.png';
import src2 from '../assets/images/2.png';
import src3 from '../assets/images/3.png';
import src4 from '../assets/images/4.png';
import src5 from '../assets/images/5.png';
import src6 from '../assets/images/6.png';
import src7 from '../assets/images/7.png';
import src8 from '../assets/images/8.png';
export default {
  data() {
    return {
      value: '',
      page: 1,
      limit: 10,
      swipeData: [],
      gridData: [
        { src: src1, text: '乐淘超市' },
        { src: src2, text: '乐淘超市' },
        { src: src3, text: '乐淘超市' },
        { src: src4, text: '乐淘超市' },
        { src: src5, text: '乐淘超市' },
        { src: src6, text: '乐淘超市' },
        { src: src7, text: '乐淘超市' },
        { src: src8, text: '乐淘超市' },
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

  },
  components: {
    backTop,
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

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

    .imgWarp {
      width: 50px;
      height: 54px;
      background: rgb(255, 246, 179);
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

  // 商品列表css
  .goodsWrap {
    @include flex-around-center;
    padding: 0 5px;
    flex-wrap: wrap;
    background: rgb(255, 246, 179);
    border-radius: 20px;
    padding-bottom: 50px;

    .goodsItem {
      width: 48%;
      padding-bottom: 5px;
      font-size: 14px;
      color: #333;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin: 5px 0;

      .goodsImgWrap {
        height: 180px;

        .goodsImg {
          width: 100%;
          height: 100%;
        }
      }

      .goodsPadding {
        padding: 0 10px;

        .goodsText {
          @include ellipsis-line-2;
          margin: 5px 0 10px;
          line-height: 1.5;
        }

        .goodsPrice {
          color: red;
          font-size: 20px;
        }

        .goodsComments {
          margin-top: 5px;
          color: #999;
          font-size: 12px;
        }
      }


    }
  }
}
</style>
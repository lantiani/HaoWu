<template>
  <div class="app">
    <div class="areaWarp">
      <van-checkbox :value="userAddress.isDefault"></van-checkbox>
      <div>
        <div class="userInfo">
          <span>{{ userAddress.name }}</span> <span>{{ userAddress.tel }}</span>
        </div>
        <div>{{ userAddress.province }}{{ userAddress.city }}{{ userAddress.country }}</div>
      </div>
    </div>

    <div class="cardWarp">
      <div class="bagImg" v-if="goodsData.length === 0 ? true : false">
        <img src="../assets/images/car.png" alt="">
        <div class="cartText">您的购物车空空如也</div>
        <van-button to="/home/index" type="danger">去首页</van-button>
      </div>
    </div>

    <van-swipe-cell v-for="(item, index) in goodsData" :key="item.id">
      <div class="checkWarp">
        <div class="check">
          <van-checkbox v-model="$store.getters.isChecked[item.id]"
            @click="isChecked(index, $store.getters.isChecked[item.id])"></van-checkbox>
        </div>
        <van-card :num="item.count" class="goods-card" :thumb="item.picture">
          <div slot="title" class="title van-ellipsis">
            {{ item.title }}
          </div>
          <div slot="desc" class="van-multi-ellipsis--l2">
            {{ item.zhaiyao }}
          </div>
          <div slot="price" class="price">
            {{ item.price | showPrice }}
          </div>
          <div slot="footer">
            <van-stepper v-model="$store.getters.inCount[index]" :name="item.id" theme="round" button-size="22"
              disable-input @change="changeCount(index, $store.getters.inCount[index])" />
          </div>
        </van-card>
      </div>
      <template #right>
        <van-button square text="删除" type="danger" @click="unGoods(index)" class="delete-button" />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="$store.getters.goodsPrice" button-text="提交订单" v-if="goodsData.length === 0 ? false : true">
      <van-checkbox :value="$store.getters.checkAll" @click="isCheckAll">全选</van-checkbox>
      <template #tip>
        仅支持微信支付
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { fetchUserArea } from '../api/user.js'
export default {
  data() {
    return {
      isShow: false,
      isCheck: true,
      goodsData: this.$store.state.goodsInfo,
      userAddress: '',
    }
  },
  created() {
    this.getUserAddress()
  },
  methods: {
    changeCount(index, count) {
      this.$store.commit('changeCount', { index, count });
    },
    isCheckAll() {
      this.$store.commit('isCheckedsAll');
    },
    isChecked(index, checked) {
      this.$store.commit('isCheckeds', { index, checked })
    },
    unGoods(index) {
      this.$store.commit('unGoodsData', { index });
      Toast.success('删除成功')
    },
    async getUserAddress() {
      let result = await fetchUserArea(this.$store.state.userInfo.id);
      this.userAddress = result.find(item => item.isDefault);
      result.forEach(item => {
        if (!item.isDefault) {
          this.$dialog.confirm({
            message: '请先选择地址'
          })
        }
      });
    }
  },
  computed: {

  },
  filters: {
    showPrice(price) {
      return '￥' + price.toFixed(2);
    }
  },

}
</script>

<style lang="scss" scoped>
.app {
  background: #f2f2f2;
  height: 100vh;
  // padding-bottom: 80px;

  .cardWarp {
    display: flex;
    align-content: center;
    justify-content: center;

    .bagImg {
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .cartText {
        margin: 6px;
        font-size: 14px;
        color: #666;
      }

      .van-button {
        margin-top: 14px;
        width: 50%;
      }
    }

  }

  .goods-card {
    margin: 0;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;

    .title {
      margin: 10px 0;
      font-weight: 700;
      font-size: 14px;
    }

    .price {
      color: #ee0a24;
      font-weight: 700;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .delete-button {
    height: 100%;
  }

  .van-swipe-cell {
    margin-top: 4px;
    // background-color: #fff;

    .van-card {
      // border-radius: 10px;
      background: #fff;
    }

    .checkWarp {
      display: flex;
    }

    .check {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 0 6px;

      ::v-deep .van-card__header {
        margin-top: 10px;
      }
    }
  }

  .van-submit-bar {
    bottom: 50px;
  }

  .areaWarp {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid red;

    .userInfo {
      display: flex;
    }
  }

}
</style>
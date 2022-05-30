<template>
  <div class="app">
    <!-- v-if="userAddress || $store.state.userInfo.length !== 0" -->
    <div class="areaContainer" @click="$router.push('/Address')" v-if="false">
      <div class="areaWarp">
        <div>
          <p class="userInfo">
            <van-tag type="danger">默认</van-tag>
            <span class="area">{{ userAddress.province }}{{ userAddress.city }}{{ userAddress.country }}</span>
          </p>
          <h3 class="addressDetail">{{ userAddress.addressDetail }}</h3>
          <p>{{ userAddress.tel }}</p>
        </div>
        <div>
          >
        </div>
      </div>
      <div class="addressBcg"></div>
    </div>
    <!-- v-else -->
    <van-button plain block type="info" @click="$router.push('/Address')" v-if="false">添加地址</van-button>

    <div class="cardWarp">
      <div class="bagImg" v-if="carGoods.length === 0 ? true : false">
        <img src="../assets/images/car.png" alt="">
        <div class="cartText">您的购物车空空如也</div>
        <van-button to="/home/index" type="danger">去首页</van-button>
      </div>
    </div>

    <van-swipe-cell v-for="(item, index) in carGoods" :key="item.id">
      <div class="checkWarp">
        <div class="check">
          <van-checkbox v-model="$store.getters.isChecked[item.id]"
            @click="isChecked(item.id, $store.getters.isChecked[item.id])"></van-checkbox>
        </div>
        <van-card :num="item.count" class="goods-card" :thumb="item.thumb_path">
          <div slot="title" class="title van-ellipsis">
            {{ item.title }}
          </div>
          <div slot="desc" class="van-multi-ellipsis--l2">
            <!-- {{ goodsData.zhaiyao }} -->
            {{ $store.getters.selectGoodsId }}
          </div>
          <div slot="price" class="price">
            {{ item.sell_price | showPrice }}
          </div>
          <div slot="footer">
            <van-stepper v-model="$store.getters.inCount[index]" :name="item.id" theme="round" button-size="22"
              disable-input @change="changeCount(index, $store.getters.inCount[index])" />
          </div>
        </van-card>
      </div>
      <template #right>
        <van-button square text="删除" type="danger" @click="unGoods(index, item.id)" class="delete-button" />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="$store.getters.goodsPrice" @submit="onSubmit" button-text="提交订单"
      v-if="carGoods.length === 0 ? false : true">
      <van-checkbox :value="$store.getters.checkAll" @click="isCheckAll">全选</van-checkbox>
      <template #tip>
        仅支持微信支付
      </template>
    </van-submit-bar>
    <div style="height:130px"></div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { fetchUserArea, fetchGoods } from '../api/user.js'
import { fetchOrderDetail } from '../api/orderDetail.js'
import { orderId } from '../util/tools.js'
export default {
  data() {
    return {
      isShow: false,
      isCheck: true,
      goodsData: this.$store.state.goodsInfo,
      carGoods: [],
      userAddress: '',
      ids: this.$store.getters.getCartGoods,
    }
  },
  created() {
    console.log(this.ids);
    if (this.ids === '') {
      // 没有商品时不执行获取
      return;
    }
    this.getUserAddress();
    this._fetchGoods();
  },
  methods: {
    changeCount(index, count) {
      this.$store.commit('changeCount', { index, count });
    },
    isCheckAll() {
      this.$store.commit('isCheckedsAll');
    },
    isChecked(id, checked) {
      this.$store.commit('isCheckeds', { id, checked })
    },
    unGoods(index, id) {
      this.carGoods.splice(index, 1);
      this.$store.commit('unGoodsData', { id });
      Toast.success('删除成功');
    },
    async getUserAddress() {
      let result = await fetchUserArea(this.$store.state.userInfo.id);
      result.forEach(item => {
        if (item.isDefault) {
          this.userAddress = item
        }
      });
      let isDefault = result.every(item => !item.isDefault);
      if (isDefault) {
        this.$dialog.confirm({
          message: '当前未选择地址'
        })
      }

    },
    async _fetchGoods() {
      let { status, message } = await fetchGoods(this.ids);
      if (status === 0) {
        this.carGoods = message;
      }
    },
    async onSubmit() {
      let goodsData = {
        user_id: this.$store.state.userInfo.id,
        address_id: this.userAddress.id,
        goods_ids: this.$store.getters.selectGoodsId,
        number: this.$store.getters.selectInCount,
        total_price: this.$store.getters.goodsPrice / 100,
        order_id: orderId()
      }
      // 提交订单loading提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "提交订单中",
        forbidClick: true,
        overlay: true
      });
      let { status, message } = await fetchOrderDetail(goodsData)
      this.$toast(message);

      if (status === 0) {
        // 清购物车，跳转到订单列表
        this.$store.commit("clearBuyGoods");
        this.$router.replace('/order')
      } else {
        this.$toast('订单提交失败，请稍后再试');
        return
      }
      // 关闭提示
      this.$toast.clear();
    }
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
  height: 130vh;

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

    .van-card {
      background: #fff;
    }

    .checkWarp {
      display: flex;
      background: #fff;
      padding-right: 24px;
      border-radius: 20px;
      overflow: hidden;
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

  .areaContainer {
    .areaWarp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #fff;
      font-size: 16px;

      .userInfo {
        display: flex;

        .van-tag {
          font-size: 12px;
        }
      }
    }

    .addressBcg {
      background: url('../assets/images/bd1.png');
      background-size: 100%;
      width: 100%;
      height: 4px;
    }
  }

}
</style>
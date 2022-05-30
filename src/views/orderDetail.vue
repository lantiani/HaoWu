<template>
  <div class="orderDetailContainer">
    <div class="status">
      <div class="text">{{ statusText }}</div>
      <img src="../assets/images/car2.png" alt width="80px" />
    </div>
    <!-- 物流信息 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '60%' }">
      <van-steps direction="vertical" :active="active">
        <van-step v-for="item in kuaidi" :key="item.time">
          <h3>{{ item.location }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </van-popup>

    <div class="addressWrap">
      <div class="address">
        <div class="location">
          <van-icon name="location-o" />
        </div>
        <!-- Vue2必须保证有一级属性的存在，才可以访问其二级属性 -->
        <div v-if="goodsOrder.address_info" class="info">
          <div>
            {{ goodsOrder.address_info.name }} -
            {{ goodsOrder.address_info.tel }} -
            {{ goodsOrder.address_info.province }}-
            {{ goodsOrder.address_info.city }}-
            {{ goodsOrder.address_info.country }}-
            {{ goodsOrder.address_info.addressDetail }}
          </div>
        </div>
        <van-divider />
      </div>
    </div>
    <van-card
      @click="$router.push('/goodsDetail/' + item.id)"
      v-for="item in goodsInfo"
      :key="item.id"
      :price="item.sell_price"
      :title="item.title"
      :thumb="item.thumb_path"
    >
    </van-card>

    <!-- 订单一些基本信息 -->
    <div class="orderInfo">
      <div class="item">
        <span>下单时间</span>
        <span>{{ goodsOrder.add_time | timeFormat }}</span>
      </div>
      <div class="item">
        <span>商品总价</span>
        <span>&yen; {{ goodsOrder.total_price }}</span>
      </div>
      <div class="item">
        <span>实付款</span>
        <span>&yen;{{ goodsOrder.actual_price }}</span>
      </div>
      <div class="item">
        <span>付款方式</span>
        <span>{{ goodsOrder.pay_way }}</span>
      </div>
      <div class="item">
        <span>运费险</span>
        <span>&yen; 0.00</span>
      </div>
      <div class="item">
        <span>订单号</span>
        <span>{{ goodsOrder.order_id }}</span>
      </div>
    </div>

    <!-- 订单一些操作按钮 -->
    <div class="btns">
      <van-button
        size="mini"
        v-if="goodsOrder.status === 0"
        @click="payment"
        type="danger"
        >立即付款</van-button
      >
      <van-button size="mini" @click="isShow = true" v-if="goodsOrder.is_out === 1" type="primary"
        >物流信息</van-button
      >
      <van-button
        size="mini"
        v-if="goodsOrder.is_out === 0 && goodsOrder.status === 1"
        type="danger"
        >提醒发货
      </van-button>
      <template v-if="goodsOrder.status === 2">
        <van-button size="mini" type="info">已完成</van-button>
        <van-button size="mini" type="info">去评价</van-button>
      </template>
    </div>
  </div>
</template>

<script>
import {
  getUserOrderDetail,
  paymentOrder,
  getKuaidi,
} from "../api/orderDetail.js";
import { fetchGoods } from "../api/user.js";
export default {
  data() {
    return {
      orderId: this.$route.params.order_id,
      goodsOrder: "",
      goodsInfo: "",
      active: 1,
      isShow: false,
      kuaidi: "",
    };
  },
  created() {
    this._getUserOrderDetail();
    this._getKuaidi();
  },
  methods: {
    async _getUserOrderDetail() {
      let result = await getUserOrderDetail(this.orderId);
      this.goodsOrder = result;
      this._fetchGoods();
    },
    async _fetchGoods() {
      let result = await fetchGoods(this.goodsOrder.goods_ids);
      this.goodsInfo = result.message;
    },
    payment() {
      this.$dialog
        .confirm({
          title: "付款",
          message: "确认支付吗",
        })
        .then(async () => {
          try {
            await paymentOrder(this.orderId);
            this.$toast.success({
              message: "支付成功",
              icon: "wechat-pay",
            });
            let result = await getKuaidi();
            this.kuaidi = result;
            this.goodsOrder.status = 2;
            this.goodsOrder.is_take = 1;
            this.goodsOrder.is_out = 1;
          } catch (err) {
            console.log(err);
          }
        });
      this.$toast("取消支付");
      return;
    },
    async _getKuaidi() {
      let result = await getKuaidi();
      this.kuaidi = result;
    },
  },
  computed: {
    statusText() {
      let { is_take, is_out, status } = this.goodsOrder;
      if (is_out === 1 && is_take === 0) {
        this.active = 2;
        return "您的包裹正在运输中";
      }
      if (status === 2) {
        this.active = 4;
        return "已完成";
      }
      if (status === 0) {
        this.isShow = false;
        return "待付款";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.orderDetailContainer {

    .van-popup {
        padding: 10px;

        .van-step{
            padding: 16px;
        }
    }

  .van-card {
    .van-card__thumb {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    background-color: #fe5102;
    color: #f4d9be;
  }

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;

      .location {
        width: 30px;
        height: 30px;
        background: #f34a09;
        border-radius: 50%;
        padding-left: 20px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .van-icon {
        margin-right: 20px;
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .orderInfo {
    padding: 2px 10px;

    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #787373;
      margin: 5px 0;

      .copy {
        color: orangered;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
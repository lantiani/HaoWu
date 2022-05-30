<template>
  <div>
    <van-tabs v-model="active" @change="changeSelect">
      <van-tab v-for="item in select" :key="item.title" :title="item.title">
        <ul class="orderContainer">
          <li class="orderContent" v-for="item in filterOrder" :key="item.order_id"
            @click="$router.push(`/orderdetail/${item.order_id}`)">
            <van-card :num="item.number" :price="item.total_price | showPrice" :desc="item.pay_way"
              :title="item.goods[0].title" :thumb="item.goods[0].thumb_path">
              <template #tags>
                <van-tag type="warning">下单时间:{{ item.add_time | timeFormat }}</van-tag>
                <!-- <van-tag plain type="danger">标签</van-tag> -->
              </template>
              <template #footer>
                <van-tag type="danger" v-clipboard:copy="item.order_id"
                  v-clipboard:success="onCopy">复制订单号</van-tag>
                <van-tag type="danger" v-if="item.status === 0">立即付款</van-tag>
                <van-tag v-if="item.is_out === 1" size="mini" type="primary">物流信息</van-tag>
                <template v-if="item.status === 2">
                  <van-tag type="success">已完成</van-tag>
                  <van-tag type="warning">评价</van-tag>
                </template>
                <van-tag type="danger">客服</van-tag>
              </template>
            </van-card>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fetchAllOrder } from '../api/orderDetail.js';
import { fetchGoods } from '../api/user.js';
export default {
  data() {
    return {
      active: 0,
      status: 'all',
      select: [
         { title: '全部', status: 'all' },
         { title: '未付款', status: 0 },
        { title: '已付款', status: 1 },
        { title: '完成', status: 2 },
      ],
      goodsOrder: [],
    };
  },
  created() {
    this._fetchAllOrder()
  },
  methods: {
    changeSelect(index, title) {
      let selectOrder = {
        "全部": "all",
        "未付款": 0,
        "已付款": 1,
        "完成": 2,
      }
      // '全部':all 通过title拿到status
      let status = selectOrder[title];
      this.status = status;
    },
    async _fetchAllOrder() {
      // 获取对应用户id的订单
      let result = await fetchAllOrder(this.$store.state.userInfo.id);
      let promiseArr = [];
      result.forEach(item => {
        // 获取订单中的商品信息
        promiseArr.push(fetchGoods(item.goods_ids));
      });
      // 并发
      let allGoods = await Promise.all(promiseArr);

      let allOrderGoods = result.map((item, index) => {
        item.goods = allGoods[index].message
        return item;
      })
      this.goodsOrder = allOrderGoods;
    },
    onCopy(e) {
      event.stopPropagation()
      this.$toast('复制成功')
    }
  },
  computed: {
    filterOrder() {
      if (this.status === 'all') {
        return this.goodsOrder
      }
      // 筛选对应状态的订单并返回出去
      return this.goodsOrder.filter(item => item.status === this.status)
    }
  },
  filters: {
    showPrice(price) {
      return price.toFixed(2);
    }
  },

};
</script>

<style lang="scss" scoped>
.van-tabs {
  .orderContainer {
    .orderContent {
      margin-top: 10px;

      .van-card {
        border-radius: 20px;
        background: #f2f2f2;

        .van-tag {
          margin: 0 2px;
          padding: 2px;
        }
      }
    }
  }
}
</style>
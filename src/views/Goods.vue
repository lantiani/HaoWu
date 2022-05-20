<template>
<!-- 商品列表 -->
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="goodsWrap">
          <goods-list v-for="item in lists" :key="item.id" :data="item" @goodsDetail="getGoodsId">
            <div slot="goodsPrice">
              <div class="area">
                <div class="price">
                  <span class="originPrice">&yen; {{ item.sell_price }}</span>
                  <span class="oldPrice">&yen; {{ item.market_price }}</span>
                </div>
              </div>
            </div>
            <div class="info" slot="goodsComments">
              <span class="hot">热卖中</span>
              <span>剩余{{ item.stock_quantity }}件</span>
            </div>
          </goods-list>
        </div>
      </van-list>
    </van-pull-refresh>

    <back-top />
  </div>

</template>

<script>
import GoodsList from '../components/GoodsList.vue';
import { fetchGoodsList } from '../api/goodslist.js';
import BackTop from '../components/BackTop.vue';
export default {
  data() {
    return {
      page: 0,
      limit: 10,
      lists: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    getGoodsId(data, event) {
      this.$router.push(`/goodsDetail/${data}`);
    },
    async _fetchGoodsList() {
      if (this.refreshing) {
        this.lists = [];
        this.refreshing = false;
      }
      let { message } = await fetchGoodsList(this.page, this.limit);
      this.lists = [...this.lists, ...message];
      this.loading = false;

      if (message.length === 0) {
        this.finished = true;
      }
    },
    onLoad() {
      this.page++;
      this._fetchGoodsList();
    },
    onRefresh() {
      // 清空列表数据
      this.page = 0;
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

  },
  components: { GoodsList, BackTop },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.goodsWrap {
  @include flex-around-center;
  @include goodsWrap;

  .price {
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .originPrice {
      font-size: 16px;
      color: red;
    }

    .oldPrice {
      color: #ccc;
      text-decoration: line-through;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
  }


}
</style>
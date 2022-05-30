<template>
  <div class="searchContainer">
    <div class="search">
      <van-search
        @search="onSearch"
        v-model="value"
        shape="round"
        show-action
        placeholder="请输入搜索关键词"
      >
        <div slot="left" @click="$router.back()" class="back">
          <van-icon name="arrow-left" />
        </div>
        <div slot="action" @click="onSearch(value)">
          <span>搜索</span>
        </div>
      </van-search>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeSort"
      />
    </van-dropdown-menu>
    <div class="goodsWrap">
      <goods-list
        v-for="item in goodsInfo"
        :key="item.id"
        :data="item"
      ></goods-list>
    </div>
  </div>
</template>

<script>
import { fetchSearchResult } from "../api/search.js";
import goodsList from "../components/GoodsList.vue";
export default {
  data() {
    return {
      value: this.$route.params.searchInfo,
      sort: "buy",
      order: "desc",
      page: 1,
      pagesize: 10,
      goodsInfo: "",
      value1: "buy",
      option1: [
        { text: "默认排序", value: "buy" },
        { text: "好评排序", value: "likes" },
        { text: "价格排序", value: "sell_price" },
      ],
    };
  },
  created() {
    this._fetchSearchResult();
  },
  methods: {
    async _fetchSearchResult() {
      let queryString = {
        value: this.value,
        sort: this.sort,
        order: this.order,
        page: this.page,
        pagesize: this.pagesize,
      };
      let result = await fetchSearchResult(queryString);
      this.goodsInfo = result;
    },
    changeSort(sort) {
      this.sort = sort;
      this._fetchSearchResult();
    },
    onSearch(value) {
      if (value) {
        this.value = value;
      }
      this._fetchSearchResult();
    },
  },
  components: {
    goodsList,
  },
};
</script>

<style lang="scss" coped>
@import "../assets/scss/common.scss";

.searchContainer {
  padding-top: 100px;
  background: #f2f2f2;

  .goodsWrap {
    @include flex-around-center;
    @include goodsWrap;
  }

  .van-dropdown-menu {
    position: fixed;
    top: 54px;
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
  }

  .search {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    overflow: hidden;
    background: #fff;
    z-index: 9999;

    .logWarp {
      width: 50px;
      height: 54px;
      padding: 0px 5px;

      img {
        width: 100%;
        height: 100%;
        transform: scaleY(0.6);
      }
    }
  }

  .van-dropdown-menu {
    .van-dropdown-menu__item {
      .van-ellipsis {
        color: #ee0a24;
      }
    }
  }

  .van-search {
    flex: 1;
    .back {
      padding-right: 4px;
      padding-top: 2px;
      color: #1989fa;
    }
  }
}
</style>
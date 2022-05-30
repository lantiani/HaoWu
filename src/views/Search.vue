<template>
  <div>
    <div class="search-container">
      <div class="search">
        <div class="logWarp">
          <img src="../assets/images/logo.png" alt="">
        </div>
        <van-search @search="onSearch" v-model="value" shape="round" @focus="onFocus" show-action
          placeholder="请输入搜索关键词">
          <div slot="action" @click="onSearch(value)">
            <span>搜索</span>
          </div>
        </van-search>
      </div>
      <van-popup v-model="show" @click-overlay="$router.back()" overlay position="top" :style="{ height: '50%' }">
        <div class="searchWrap">
          <div class="card">
            <div class="header">
              <h4>搜索历史</h4>
              <van-icon name="delete-o" @click="deleteHistory" />
            </div>
            <div class="footer">
              <span v-for="item in historySearch" :key="item" @click="onSearch(item)">{{ item }}</span>
            </div>
          </div>
          <van-divider />
          <div class="card">
            <div class="header">
              <h4>热门搜索</h4>
              <van-icon :name="showText ? 'closed-eye' : 'eye-o'" @click="eye" />
            </div>
            <div class="footer" v-show="!showText">
              <span v-for="item in hotSearch" :key="item">{{ item }}</span>
            </div>
            <div class="text-center" v-show="showText">已隐藏热门搜索</div>
          </div>
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
let historySearch = JSON.parse(localStorage.getItem('historySearch') || '[]')
export default {
  data() {
    return {
      show: true,
      value: '',
      historySearch,
      hotSearch: [111, 222],
      showText: false,
    }
  },
  methods: {
    eye() {
      this.showText = !this.showText;
    },
    deleteHistory() {
      localStorage.removeItem('historySearch');
      this.historySearch = [];
    },
    onFocus() {
      if (this.$route.path !== '/home/index/search') {
        this.$router.push('/home/index/search');
      }
    },
    onSearch(value) {
      if (!this.historySearch.includes(value) && value !== '') {
        this.historySearch.push(value)
        localStorage.setItem('historySearch', JSON.stringify(this.historySearch));
        return
      }
      if(value) {
        this.$router.push('/searchresult/'+value)
      }
    }
  },
  computed: {
    isShow() {
      return this.$route.mate.showSearchAction
    }
  },
}
</script>

<style lang="scss" coped>
.van-popup {
  top: 54px;
}

.van-overlay {
  top: 54px
}

.search-container {

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
    z-index: 9999;

    .logWarp {
      width: 50px;
      height: 54px;
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

  .searchWrap {
    .card {
      padding: 6px;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
      }

      h4 {
        font-size: 14px;
      }

      .text-center {
        text-align: center;
        font-size: 12px;
        color: #ccc;
        margin-top: 30px;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        margin: 4px;

        span {
          height: 30px;
          line-height: 30px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 4px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
        }
      }
    }
  }
}
</style>
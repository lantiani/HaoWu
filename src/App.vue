<template>
  <div class="app">
    <van-nav-bar
      v-show="isShow"
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "好物",
      isShow: false,
      netStatus: window.navigator.onLine,
    };
  },
  watch: {
    $route: {
      handler: function (newRoute, oldRoute) {
        let { title, isIndexShow } = newRoute.meta;
        this.title = title;
        this.isShow = !isIndexShow;
      },
      // immediate: true
    },
    netStatus: {
      handler: function (newStatus, oldStatus) {
        let message = "";
        message = newStatus ? "网络连接成功" : "网络异常，请检查网络";
        this.$toast(message);
      },
    },
  },
  methods: {
    updateNetStatus(e) {
      const { type } = e;
      this.netStatus = type === "online" ? true : false;
    },
  },
  mounted() {
    //   网络状态改变时触发
    window.addEventListener("online", this.updateNetStatus);
    window.addEventListener("offline", this.updateNetStatus);
  },
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: none;
}

.app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
}
</style>


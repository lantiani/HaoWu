<template>
  <div class="app">
      <div class="bagImg">
        <img src="../assets/images/car.png" alt="">
        <div class="cartText">您的购物车空空如也</div>
        <van-button to="/home/index" type="danger">去首页</van-button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .app {
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
        margin-top:14px;
        width: 50%;
      }
    }
  }
</style>
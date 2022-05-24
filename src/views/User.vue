<template>
  <div>
    <div class="user-info" @click="login">
      <div class="user-img-wrap">
        <img class="user-img" :src="imgLink" @click="fetchFile" alt="" />
        <input type="file" ref="imgInfo" v-show="false" @change="uploadFile" name="" id="">
      </div>
      <div class="user-info-text">{{ isLoginText }}</div>
    </div>

    <van-cell title="我的订单" is-link value="" />
    <div class="order">
      <div class="order-from">
        <van-icon name="pending-payment" size="1.5rem" />
        <div class="order-msg-text">待付款</div>
      </div>
      <div class="order-from">
        <van-icon name="logistics" size="1.5rem" />
        <div class="order-msg-text">待收货</div>
      </div>
      <div class="order-from">
        <van-icon name="sign" size="1.5rem" />
        <div class="order-msg-text">退换保修</div>
      </div>
    </div>
    <OrderCell leftIocn="vip-card-o" leftText="会员中心" iocColor="#1989fa" />

    <OrderCell leftIocn="smile-comment-o" leftText="服务中心" iocColor="#1989fa" />

    <OrderCell leftIocn="gift-card-o" leftText="地址管理" iocColor="#1989fa" link="/Address" />

    <OrderCell leftIocn="setting" iocColor="#1989fa" leftText="设置" />
    <div style="margin: 16px">
      <van-button round block type="danger" native-type="submit" @click="outLogin">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import OrderCell from "./OrderCell.vue";
import { Dialog } from "vant";
import { fetchUpload } from '../api/user.js'
const src =
  "https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500";
export default {
  data() {
    return {
      imgLink: src,
    };
  },
  components: {
    OrderCell,
    //
  },
  methods: {
    // 点击登录
    login() {
      // 判断是否登录了 登录了 就不去登录页 不弹出服务条款
      if (this.$store.state.userInfo.length === 0) {
        Dialog.confirm({
          message: '请先登录'
        }).then(() => {
          this.$router.push("/login");
        });
      }
      return;
      // 上传头像
    },
    outLogin() {
      // 是否 退出 退出 时清空 用户信息
      if (this.$store.state.userInfo.length !== 0) {
        Dialog.confirm({
          title: "是否退出登录",
        }).then(() => {
          console.log('退出');
          this.imgLink = src;
          this.$store.commit("clearUserInfo");
          this.$router.push('/')
        });
      } else {
        Dialog.confirm({
          title: "当前状态未登录",
        })
      }
    },
    fetchFile() {
      this.$refs.imgInfo.click();
    },
    async uploadFile() {
      // 此时可以自行将文件上传至服务器
      const file = this.$refs.imgInfo.files[0]
      const id = this.$store.state.userInfo.id;
      const formData = new FormData();
      formData.append('file', file)
      formData.append('user_id', id)
      // 更新用户头像
      // console.log(file.files,'file');
      let {src} = await fetchUpload(formData);
      this.$store.commit('uploadImg',src)
    }
  },
  computed: {
    isLoginText() {
      if (this.$store.state.userInfo.length) {
        return "登录/注册";
      } else {
        //  判断 用户是否 有自己的图片 没有就显示默认图
        if (this.$store.state.userInfo.avatar) {
          this.imgLink =
            "http://api.w0824.com/" + this.$store.state.userInfo.avatar;
        }
        return this.$store.state.userInfo.username;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.user-info {
  background: deepskyblue;
  height: 160px;
  padding: 0 20px;
  @include flex-center-center;

  .user-info-text {
    padding: 10px;
    color: #000;
    font-size: 1rem;
  }

  .user-img-wrap {
    width: 4rem;
    height: 4rem;

    .user-img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}

.order {
  justify-content: space-between;
  padding: 10px 50px;
  @include flex-between-center;

  .order-from {
    font-size: 0.5rem;
    text-align: center;
  }

  .van-button--info {
    background: red;
  }
}
</style>
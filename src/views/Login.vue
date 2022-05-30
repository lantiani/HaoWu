<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <div class="register">
            <router-link to="/register">
                <span class="text">没有账户?去注册？</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import {fetchLogin} from '../api/user.js';
import {Toast} from 'vant'
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async onSubmit(userData) {
            let {token,message,status,userInfo} = await fetchLogin(userData);
            if(status === 0) {
                Toast.success(message);
                this.$router.push('/');
                this.$store.commit('setUserInfo',{userInfo});
                this.$store.commit('setToken',{token});
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .register {
        text-align: center;
        .text {
            color: #ccc;
            font-size: 12px;
        }
    }
</style>
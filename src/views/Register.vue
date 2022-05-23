<template>
    <van-form @submit="onSubmit">
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />

        <van-field v-model="password" type="password" name="password" autocomplete='' label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="confirmPard" type="password" name="password" autocomplete='' label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
        <div>
            {{ pointOut }}
        </div>
    </van-form>
</template>

<script>
import { fetchRegister } from '../api/user.js';
import { Toast } from 'vant';
export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPard: '',
            pointOut: ''
        };
    },
    methods: {
        async onSubmit(userData) {
            if (this.password !== this.confirmPard) {
                Toast.fail('两次密码不一致');
                return
            }
            let { status, message } = await fetchRegister(userData);
            Toast.success(message);
            if (status === 0) {
                this.$router.push('./login')
            }
        },
    },
}
</script>

<style>
</style>
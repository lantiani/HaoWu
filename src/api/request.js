import axios from "axios"
import Vue from "vue"
import store from '../store/index.js'

import {
    Toast
} from "vant"
Vue.use(Toast);
var instance = axios.create(
    { baseURL: 'http://api.w0824.com/api' }
)

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log('请求拦截器');
    if(store.state.token) {
        config.headers['token'] = store.state.token;
    }
    config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据
    // 在发送请求之前做些什么
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.status === 40001) {
        store.commit('clearUserInfo')
        Toast(response.data.message);
        router.replace({
            path:'/login',
            query:{
                redirect:router.currentRoute.fullPath
            }
        })
    }
    Toast.clear();
    return response.data;
}, function (error) {
    Toast.clear();
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance
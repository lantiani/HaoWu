import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        checkAll: false,
        goodsInfo: [],
        userInfo:'',
        token:'',
        areaData:[]
    },
    mutations: {
        addGoodsToCarts(state, goods) {
            let index = state.goodsInfo.findIndex(item => item.id === goods.id);
            if (index === -1) {
                state.goodsInfo.unshift(goods);
            } else {

                state.goodsInfo[index].count += goods.count;
            }
        },
        changeCount(state, { index, count }) {
            console.log('kk', count, index);
            state.goodsInfo[index].count = count;
            console.log(state.goodsInfo[index].count);
        },
        isCheckedsAll(state) {
            state.checkAll = !state.checkAll;
            state.goodsInfo.forEach(item => {
                item.checked = state.checkAll;
            })
        },
        isCheckeds(state, { index, checked }) {
            state.goodsInfo[index].checked = checked;
        },
        unGoodsData(state,{index}) {
            state.goodsInfo.splice(index,1);
        },
        // 设置用户登录信息
        setUserInfo(state,{userInfo}) {
            state.userInfo = userInfo
        },
        setToken(state,{token}) {
            state.token = token;
        },
        clearUserInfo(state) {
            state.userInfo = '';
            state.token = '';
        },
        // 更新头像
        uploadImg(state,src) {
            state.userInfo.avatar = src
        },
        // 添加地址
        addAddress(state,{areaData}) {
            state.areaData = areaData;
        }
    },
    getters: {
        inCount(state) {
            let num = {};
            state.goodsInfo.forEach((item, index) => {
                num[index] = item.count
            });
            return num;
        },
        goodsPrice(state) {
            let prices = 0;
            state.goodsInfo.forEach(item => {
                if (item.checked) {
                    prices += item.price * item.count;
                }
            })
            return prices * 100
        },
        checkAll(state) {
            let checked = false;
            checked = state.goodsInfo.every(item => {
                return item.checked === true;
            });
            return checked;
        },
        isChecked(state) {
            let checked = {};
            state.goodsInfo.forEach(item => {
                checked[item.id] = item.checked;
            })
            return checked;
        }
    },
    plugins: [createPersistedState()]
})
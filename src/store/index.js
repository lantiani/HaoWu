import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        checkAll: false,
        goodsInfo: [],
        userInfo: '',
        token: '',
        areaData: []
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
        isCheckeds(state, { id, checked }) {
            state.goodsInfo.forEach(item => {
                if (item.id === id) {
                    item.checked = checked
                }
            })
        },
        unGoodsData(state, { id }) {
            state.goodsInfo = state.goodsInfo.filter(item => item.id !== id);
        },
        // 设置用户登录信息
        setUserInfo(state, { userInfo }) {
            state.userInfo = userInfo
        },
        setToken(state, { token }) {
            state.token = token;
        },
        clearUserInfo(state) {
            state.userInfo = '';
            state.token = '';
        },
        // 更新头像
        uploadImg(state, src) {
            state.userInfo.avatar = src
        },
        // 添加地址
        addAddress(state, { areaData }) {
            state.areaData = areaData;
        },
        // 删除已购买商品
        clearBuyGoods(state) {
            state.goodsInfo = state.goodsInfo.filter(item => !item.checked)
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
        selectInCount(state) {
            let num = 0;
            state.goodsInfo.forEach((item, index) => {
                if (item.checked) {
                    num += item.count;
                }
            });
            return num;
        },
        selectGoodsId(state) {
            let goodsId = [];
            state.goodsInfo.forEach(item => item.checked && goodsId.push(item.id))
            return goodsId.join(',')
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
        },
        getCartGoods(state) {
            return state.goodsInfo.map(item => item.id).join(',')

        }
    },
    plugins: [createPersistedState()]
})

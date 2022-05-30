import axios from './request.js'

export function fetchOrderDetail(data) {
console.log(data);
    return axios.post(`/commitorder`,data)
}

export function fetchAllOrder(suer_id) {
    return axios.post(`/userorder/${suer_id}`)
}

export function getUserOrderDetail(order_id) {
    return axios.post(`/getorder/${order_id}`);
}

export function paymentOrder(order_id) {
    return axios.post(`/payorder/${order_id}`);
}
export function getKuaidi() {
    return axios.get(`/kuaidi100`);
}
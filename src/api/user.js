import axios from './request.js'

export function fetchRegister(userData) {
    return axios.post('/register',userData)
}

export function fetchLogin(userData) {
    return axios.post('/login',userData)
}

export function fetchUpload(formData) {
    return axios.post('/upload',formData)
}

export function fetchAddress(user_id,data) {
    return axios.post(`addaddress/${user_id}`,data)
}

export function fetchUserArea(user_id) {
    return axios.get(`getaddress/${user_id}`)
}
export function fetchUpdateArea(id,data) {
    return axios.post(`updateaddress/${id}`,data)
}
export function fetchDeleteArea(address_id) {
    return axios.post(`deladdress/${address_id}`)
}

export function fetchGoods(goods_id) {
    return axios.get(`/getshopcarlist/${goods_id}`)
}

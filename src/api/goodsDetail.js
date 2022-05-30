import axios from './request.js'

export function fetchGoodsSwipe(id) {
    return axios.get(`/getthumbimages/${id}`)
}
export function fetchGoodsDetail(id) {
    return axios.get(`/getgoodsinfo/${id}`)
}

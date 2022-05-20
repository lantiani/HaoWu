import axios from './request.js'

export function fetchGoodsSwipe(id) {
    // return axios.get(`/getgoodsinfo/${id}`)
    return axios.get(`/getthumbimages/${id}`)
}
export function fetchGoodsDetail(id) {
    // http://api.w0824.com/api/87
    return axios.get(`/getgoodsinfo/${id}`)
}
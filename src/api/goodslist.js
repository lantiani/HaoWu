import axios from './request.js'

export function fetchGoodsList(page,limit) {
    return axios.get(`/getgoods?pageindex=${page}&limit=${limit}`)
}
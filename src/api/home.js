import axios from './request.js'

export function fetchSwipe() {
    return axios.get('/api/getlunbo')
}

export function fetchGoods(page,limit) {
    return axios.get(`/api/recommend?page=${page}&limit=${limit}`)
}
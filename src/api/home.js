import axios from './request.js'

export function fetchSwipe() {
    return axios.get('/getlunbo')
}

export function fetchGoods(page=1,limit=10) {
    return axios.get(`/recommend?page=${page}&limit=${limit}`)
}
import axios from './request.js'

export function fetchSearchResult(data) {
    let queryString = Object.keys(data).map(item => `${item}=${encodeURIComponent(data[item])}`).join('&');
    return axios.get(`/search?${queryString}`);
}
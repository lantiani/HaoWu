import axios from './request.js'

export function fetchRegister(userData) {
    return axios.post('/register',userData)
}

export function fetchLogin(userData) {
    console.log('aa');
    return axios.post('/login',userData)
}
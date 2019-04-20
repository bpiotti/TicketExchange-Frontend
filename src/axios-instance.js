import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://boilerdev.com/cs252/rest/api/',
    // baseURL: 'http://localhost:8080/cs252lab6/rest/api'
})

export default instance;
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/cs252lab6/rest/api/'
})

export default instance;
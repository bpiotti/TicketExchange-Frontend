import axios from 'axios'

const instance = axios.create({
    baseURL: 'localhost:8080/cs252lab6/rest/api'
})

export default instance;
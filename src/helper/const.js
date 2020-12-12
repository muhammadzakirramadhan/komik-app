import axios from 'axios'

const base_api = 'https://dev-komik.pojokan.my.id/api'

const api = axios.create({baseURL: base_api})

export default api
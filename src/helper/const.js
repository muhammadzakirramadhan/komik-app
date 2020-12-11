import axios from 'axios'

const base_api = 'https://mangamint.kaedenoki.net/api/'

const api = axios.create({baseURL: base_api})

export default api
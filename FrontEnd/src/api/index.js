import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
const token = cookies['desafio-flit']

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

if (token) {
  api.defaults.headers['authorization-token'] = `${token}`
}

export default api
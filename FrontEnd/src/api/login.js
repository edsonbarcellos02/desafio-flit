import api from './index'
import { setCookie, destroyCookie } from 'nookies'
import { useAuthStore } from '@/stores/auth'

export async function Login(login, password) {
  const response = await api.post('/login', { 
    Usuario: login,
    Senha: password
  })
  
  setCookie(undefined, 'desafio-flit', response.data.token, {
    maxAge: 60 * 30,
    path: '/',
  });

  api.defaults.headers['Authorization'] = `${response.data.token}`
  localStorage.setItem('user', btoa(JSON.stringify(response.data.user)))
  
  const user = {
    nome: response.data.user.Nome,    
  }

  localStorage.setItem('user', btoa(JSON.stringify(user)))

  const authStore = useAuthStore()
  authStore.setUser(user)

  return response.data
}

export function logout() {
  destroyCookie(undefined, 'desafio-flit')
  localStorage.removeItem('user')
  delete api.defaults.headers['Authorization']
}
import { createRouter, createWebHistory } from 'vue-router';
import { parseCookies } from 'nookies';

import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'home', component: HomeView, meta: { label: 'Gestão de Funcionários' } },      
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  const cookies = parseCookies()
  const token = cookies['desafio-flit']

  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
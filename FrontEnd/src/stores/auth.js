import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(userData) {
      this.user = userData
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadUserFromStorage() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.user = JSON.parse(atob(storedUser))
      }
    }
  }
})

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    darkMode: false,
    sidebarOpen: true,
    user: null,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    setUser(user) {
      this.user = user
    },
  },
})


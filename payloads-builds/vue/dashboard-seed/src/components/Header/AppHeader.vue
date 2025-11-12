<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
        {{ currentPageTitle }}
      </h2>
      <div class="flex items-center space-x-4">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {{ darkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'

const route = useRoute()
const appStore = useAppStore()

const currentPageTitle = computed(() => {
  return route.meta.title || route.name || 'Dashboard'
})

const darkMode = computed(() => appStore.darkMode)

const toggleDarkMode = () => {
  appStore.toggleDarkMode()
}
</script>


<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
    </div>
    <nav class="px-4">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 mb-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
      >
        <span class="mr-3">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]
</script>


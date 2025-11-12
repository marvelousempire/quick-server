<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
        <div class="text-2xl font-bold text-gray-800 dark:text-white mt-2">
          {{ stat.value }}
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
      <p class="text-gray-600 dark:text-gray-400">Dashboard content goes here...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Users', value: '1,234' },
  { label: 'Revenue', value: '$45,678' },
  { label: 'Orders', value: '567' },
  { label: 'Growth', value: '+12%' },
])
</script>


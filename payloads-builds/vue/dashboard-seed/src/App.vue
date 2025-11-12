<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <AppHeader />
        <main class="flex-1 p-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import AppHeader from './components/Header/AppHeader.vue'
</script>

<style scoped>
/* Component styles */
</style>


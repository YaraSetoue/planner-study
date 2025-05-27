<template>
  <div class="flex h-screen p-3">
    <Sidebar />
    <div class="flex flex-column flex-1">
      <div class="flex flex-row justify-content-between pl-4">
        <h1 class="text-2xl font-bold">Página</h1>
        <Header />
      </div>
      <main class="flex-1 overflow-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
</script>
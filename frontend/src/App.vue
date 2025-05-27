<template>
  <AdminLayout v-if="isAdminRoute">
    <router-view />
  </AdminLayout>
  <router-view v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()
const adminRoutes = [
  'Dashboard',
  'Tasks',
  'Routines',
  'Habits',
  'Finances',
  'Events',
  'Settings'
]
const isAdminRoute = computed(() => adminRoutes.includes(route.name))

</script>
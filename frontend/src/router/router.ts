import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Tasks from '../views/Tasks.vue'
import Routines from '../views/Routines.vue'
import Habits from '../views/Habits.vue'
import Finances from '../views/Finances.vue'
import Events from '../views/Events.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/tasks', name: 'Tasks', component: Tasks },
  { path: '/routines', name: 'Routines', component: Routines },
  { path: '/habits', name: 'Habits', component: Habits },
  { path: '/finances', name: 'Finances', component: Finances },
  { path: '/events', name: 'Events', component: Events },
  { path: '/settings', name: 'Settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
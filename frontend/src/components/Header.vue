<!-- Header.vue -->
<template>
  <header class="header flex align-items-center surface-card border-1 surface-border px-3 py-2 gap-3 z-5" 
          :style="{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }">
    
    <!-- Theme Switcher -->
    <ThemeSwitcher/>
    
    <!-- Notificações -->
    <Button class="p-button-text p-button-rounded notification-button" @click="toggleNotifications" v-tooltip.bottom="'Notificações'">
      <i class="pi pi-bell text-lg"></i>
      <Badge v-if="unreadNotifications > 0" :value="unreadNotifications" severity="danger" class="notification-badge" />
    </Button>

    <!-- Avatar com Dropdown -->
    <div class="relative">
      <Avatar 
        :label="userInitials" 
        size="large" 
        shape="circle" 
        class="surface-hover cursor-pointer"
        @click="toggleUserMenu"
        v-tooltip.bottom="userName"
      />
      <Menu 
        ref="menu"
        :model="menuItems" 
        :popup="true" 
        :appendTo="'body'" 
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';
import ThemeSwitcher from './ThemeSwitcher.vue';

const router = useRouter();
const menu = ref(null);
const unreadNotifications = ref(0); // Iniciar sem notificações
const userName = ref('João Silva');


const userInitials = computed(() => {
  return userName.value.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase(); userName.value.split(' ').map(n => n[0]).join('').toUpperCase();
});

const menuItems = ref([
  { label: 'Perfil', icon: 'pi pi-user', command: () => router.push('/profile') },
  { separator: true },
  { label: 'Sair', icon: 'pi pi-sign-out', command: () => logout() }
]);

const toggleUserMenu = (event) => {
  menu.value.toggle(event);
};

const logout = () => {
  console.log('Logout realizado');
  router.push('/login');
};

const toggleNotifications = () => {
  // Lógica para exibir notificações
};
</script>

<style scoped>
.header {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 10px;
}

.notification-button {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  transform: scale(0.8);
  min-width: 20px;
  height: 20px;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .header {
    margin: 0.5rem !important;
    top: 0.5rem;
    right: 0.5rem;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
  
  .notification-badge {
    top: -6px;
    right: -6px;
    transform: scale(0.7);
  }
}
</style>
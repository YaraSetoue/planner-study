<template>
  <aside 
    class="sidebar surface-card h-full"
    :class="{ 'collapsed': isCollapsed }"
    @mouseenter="hoverSidebar = true"
    @mouseleave="hoverSidebar = false"
  >
    <!-- Cabeçalho com Logo -->
    <div 
      class="p-4 flex align-items-center gap-3 border-bottom-1 surface-border cursor-pointer"
      @click="toggleCollapse"
    >
      <i class="pi pi-calendar text-2xl text-primary"></i>
      <transition name="logo-fade">
        <span v-if="!isCollapsed" class="font-bold text-xl">
          {{ logoText }}
        </span>
      </transition>
    </div>

    <!-- Menu Principal -->
    <nav class="flex flex-column gap-1 p-2 flex-grow-1">
      <RouterLink
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="menu-item flex align-items-center gap-2 border-round transition-all"
        :class="{ 'active-menu': $route.path === item.to}"
        v-tooltip.right="isCollapsed ? item.label : ''"
      >
        <Button :label="!isCollapsed ? item.label : ''" icon="{{ item.icon }}" iconPos="right" />
        <!-- <i :class="item.icon" class="text-lg"></i>
        <transition name="slide-fade">
          <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.label }}</span>
        </transition>
        <i 
          v-if="$route.path === item.to && !isCollapsed" 
          class="pi pi-check ml-auto text-sm text-primary"
        ></i> -->
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Tooltip from 'primevue/tooltip';
import Button from 'primevue/button';

const route = useRoute();
const isCollapsed = ref(false);
const hoverSidebar = ref(false);

const menu = [
  { label: 'Dashboard', to: '/dashboard', icon: 'pi pi-home' },
  { label: 'Tarefas', to: '/tasks', icon: 'pi pi-check-square' },
  { label: 'Rotinas', to: '/routines', icon: 'pi pi-refresh' },
  { label: 'Hábitos', to: '/habits', icon: 'pi pi-star' },
  { label: 'Finanças', to: '/finances', icon: 'pi pi-wallet' },
  { label: 'Eventos', to: '/events', icon: 'pi pi-calendar' },
];

const logoText = computed(() => {
  return isCollapsed.value ? 'P' : 'Planner';
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar {
  width: 18rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--surface-border);
  border-radius:10px;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.15);
}

.sidebar.collapsed {
  width: 4.5rem;
}

.menu-item {
  text-decoration: none !important;
  position: relative;
  border-left: 3px solid transparent;
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.2s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
    height: 100vh;
  }
  
  .sidebar.collapsed {
    width: 4.5rem;
  }
}
</style>
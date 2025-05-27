<template>
  <Button 
    :icon="darkMode ? 'pi pi-moon' : 'pi pi-sun'"
    class="p-button-rounded p-button-text theme-button"
    @click="toggleTheme"
    v-tooltip.bottom="darkMode ? 'Modo Claro' : 'Modo Escuro'"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button'; // Importação adicionada

const darkMode = ref(false);
const themeLink = ref(null);


onMounted(() => {
  themeLink.value = document.getElementById('theme-link');
  const savedTheme = localStorage.getItem('theme') || 'aura-light-indigo';  
  darkMode.value = savedTheme === 'aura-dark-indigo';
  applyTheme(savedTheme);
});

const applyTheme = (theme) => {
  if (themeLink.value) {
    themeLink.value.href = `/skins_theme/${theme}/theme.css`;
    localStorage.setItem('theme', theme);
    darkMode.value = theme === 'aura-dark-indigo';
  }
};

const toggleTheme = () => {
  const newTheme = darkMode.value ? 'aura-light-indigo' : 'aura-dark-indigo';
  applyTheme(newTheme);
};
</script>
<template>
   <Loader />
  <router-view />
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth.js';
  import Loader from '@/components/Loader.vue';

  const authStore = useAuthStore()

  onMounted(() => {
    authStore.loadUserFromStorage()
  })
</script>
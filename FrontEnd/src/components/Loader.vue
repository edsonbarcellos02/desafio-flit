<template>
  <div v-if="global.loader" class="loader-overlay">
    <div class="loader">Carregando...</div>
  </div>
</template>

<script setup>
  import { useGlobalStore } from '@/stores/global'
  const global = useGlobalStore()
</script>

<style scoped>
    .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .loader {
        background: #203b51bf;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: bold;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
</style>
<template>
  <header class="header-container">
    <h2 class="header-title">GestorOne</h2>    
    <HeaderMenu/>
  </header>  
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';  
  import HeaderMenu from '@/components/HeaderMenu.vue';

  const route = useRoute();
  const RouteLabel = computed(() => route.meta.label || 'Sem título');  

</script>

<style scoped>
  .header-container
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;       
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: #fff;
  }
  .header-title
  {
    margin-left: 15px;
    font-size: 30px;
    font-weight: bold;
    background: linear-gradient(to right, #1865e0, #16b6f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
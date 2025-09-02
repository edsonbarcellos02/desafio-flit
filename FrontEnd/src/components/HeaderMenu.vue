<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
       <button class="btn-header-user" v-bind="props">
          <div class="group-user-info">
            <v-avatar color="info">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <div class="group-user">
              <small>Usuário</small>
              <span class="user-name "> {{ user?.nome }}</span>            
            </div>
          </div>
       </button>
      </template>

      <v-card min-width="200">
        <v-list style="padding: 10px; gap: 8px; display: flex; flex-direction: column;">
          <v-list-item
            prepend-icon="mdi-login-variant"
            title="Sair"
            class="item-menu"
            base-color="#199ef2"
            @click="HandleLogout()"
          ></v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import { logout } from '@/api/login';

  const { user } = useAuthStore();
  const router = useRouter();
  const menu = ref(false);

  const HandleLogout = () => {
    logout();
    router.push('/login');
  }

</script>

<style scoped>
  .btn-header-user
  {
    gap: 4px;
    height: 60px;
    width: 190px;
    display: flex;
    padding: 10px 12px;
    align-items: center;
    justify-content: space-between;
    background-color: #1991ee;
    background-image: linear-gradient(51deg, #1865e0 50%, #1991ee 80%, #1991ee 100%); 
  }
  .user-name
  {
    color: #f4f4f4;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    max-width: 160px;
    font-size: 12px;
  }
  .user-profile
  {
    font-size: 10px;
    color: #ffffffb9;
    font-weight: 600;
    text-transform: uppercase;
  }
  .group-user-info{
    display: flex;     
    align-items: center; 
    gap: 10px
  }
  .group-user
  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .group-user small
  {
    color: #f4f4f4c5;
    font-weight: 600;
    font-size: 12px;
  }
</style>
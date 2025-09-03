
<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="branding">
        <img :src="ImageLogin" alt="Imagem com pessoas" class="image-login">
      
        <h2 class="platform-title">Gestão de Funcionários</h2>

        <p class="description font-semibold">
          Organize o cadastro de funcionários de forma simples, rápida e segura.
          Visualize informações essenciais, mantenha os dados sempre atualizados
          e melhore a eficiência da sua gestão.
        </p>

      </div>

      <div class="login-form">
        <div class="form-box">
          <div class="form-header">
            <div class="brand-header">              
              <h2 class="brand-title">GestorOne</h2>
            </div>            
          </div>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label style="font-size: 13px; color: #455a64;" for="login">Usuário</label>
              <div class="input-wrapper">
                <User class="icon-input" />
                <input type="text" id="login" v-model="login" placeholder="João" required />
              </div>
            </div>

            <div class="form-group">
              <label style="font-size: 13px; color: #455a64;" for="password">Senha</label>
              <div class="input-wrapper">
                <Lock class="icon-input" />
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Digite sua senha" required />
                <button type="button" @click="togglePassword" class="toggle-password">
                  <component :is="showPassword ? EyeOff : Eye" class="icon-small" />
                </button>
              </div>
            </div>

            <button type="submit" :disabled="isLoading" class="submit-button mt-10">
              <template v-if="isLoading">
                <div class="loading-spinner"></div>
                Entrando...
              </template>
              <template v-else>Entrar no Sistema</template>
            </button>
          </form>
        
          <div style="width: 100%; display: flex; justify-content: center; margin-top: 15px;">
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Eye, EyeOff, Lock, User} from 'lucide-vue-next'

  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import { Login } from '@/api/login';

  import ImageLogin from '@/assets/undraw_people_ka7y.svg';

  const router = useRouter();
  const login = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const showPassword = ref(false);

  const togglePassword = ()=>{
    showPassword.value = !showPassword.value;
  };

  const handleLogin = async () => {
      isLoading.value = true;
      try {
        await Login(login.value, password.value);
        router.push('/');
      } catch (err) {      
        toast(err?.response?.data || "Resposta inesperada!", {
          "theme": "light",
          "type": "warning",
          "transition": "zoom",
          "dangerouslyHTMLString": true
        });
      }finally{
        isLoading.value = false;
      }
  }
</script>

<style scoped>

    .image-login
    {
      width: 50%;
    }
    .v-btn__content {
        display: none !important;
    }
    .page-wrapper {
        min-height: 100vh;
        background: linear-gradient(124deg, #005493 0%, #00a5eb 87%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        position: relative;
    }
    .background-pattern {
        position: absolute;
        inset: 0;    
        opacity: 0.5;
        z-index: 0;
    }
    .container {
    position: relative;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    z-index: 1; 
    }
    @media(min-width: 1024px) {
        .container {
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
    }
    .branding {
        flex: 1;
        color: white;
        text-align: center;
    }
    @media(min-width: 1024px) {
        .branding {
            text-align: left;
        }
    }
    .brand-header {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 1rem;
        margin-bottom: 2rem;    
    }
    .brand-icon {
        background: linear-gradient(to right, #199ef2, #1865e0);
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .brand-title {
        font-size: 30px;
        font-weight: bold;
        background: linear-gradient(to right, #1865e0, #16b6f5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .platform-title {
        font-size: 2rem;
        font-weight: bold;
    }
    .highlight {
        display: block;
        color: #16b6f5;
    }
    .description {
        font-size: 1.125rem;
        color: #cbd5e1;
        margin: 1rem 0;
        max-width: 32rem;
    }
    .features {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .feature {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #cbd5e1;
    }
    .login-form {
        width: 100%;
        max-width: 28rem;
    }
    .form-box {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(4px);
        border-radius: 1rem;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);    
    }
    .form-header {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
    }
    .form-header h3 {
        font-size: 1.5rem;
        color: #1e293b;
        margin-bottom: 0.5rem;
        display: flex;
    }
    .form-header p {
        color: #64748b;
    }
    .form-group {
        -bottom: 1.5rem;
    }
    .input-wrapper {
        position: relative;
    }
    .icon-input {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #1865e0;
        width: 1.25rem;
        height: 1.25rem;
    }
    input[type="email"],
    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        background: white;
    }
    input:focus {
        outline: none;
        border-color: #1865e0;
        box-shadow: 0 0 0 2px #16b6f5;
    }
    .toggle-password {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;    
    }
    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
        color: #475569;
    }
    .form-options a {
        color: #475569;
        text-decoration: none;
    }
    .submit-button {
        width: 100%;        
        color: white;
        font-weight: 600;
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        background-color: #1991ee;
        background-image: linear-gradient(51deg, #1865e0 50%, #199ef2 80%, #16b6f5 100%);    
        box-shadow: -5px -5px 15px rgba(255, 255, 255, .9), 5px 5px 15px rgba(11, 89, 150, .3);
    }
    .submit-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .loading-spinner {
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid white;
        border-top-color: transparent;
        border-radius: 9999px;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 0.5rem;
    }
    @keyframes spin {
    to {
        transform: rotate(360deg);
    }
    }
    .security-box {
        margin-top: 1.5rem;
        padding: 1rem;
        background: #f1f5f9;
        border-radius: 0.5rem;
        border: 1px solid #e2e8f0;
        font-size: 0.875rem;
    }
    .security-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 0.5rem;
    }
    .support-links {
        margin-top: 1.5rem;
        text-align: center;
        font-size: 0.875rem;
        color: #cbd5e1;
    }
    .support-links a {
        color: #199ef2;
        text-decoration: none;
        margin-left: 0.25rem;
    }
    .icon-small
    {
        color: #199ef2;
    }
</style>

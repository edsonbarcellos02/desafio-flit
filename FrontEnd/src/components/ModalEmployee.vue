<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="780"
      min-height="495"
    >
      <v-card>
         <v-card-title class="modal-header">
            <v-icon start size="22">mdi-account-box</v-icon>
            Funcionário
        </v-card-title>
         
        <v-card-text>                   
          <v-form ref="formRef" v-model="valid">           
            <v-row dense>
              <v-col
                cols="12"
                md="1"
                class="avatar-container"              
              >                
                <label for="file-upload" class="cursor-pointer">
                  <v-avatar size="60" >
                    <v-img v-if="imageUrl" :src="imageUrl" />
                    <v-icon v-else size="48">mdi-account-circle</v-icon>
                  </v-avatar>
                </label>                            
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="onFileChange"
                />
              </v-col>

              <v-col
                cols="12"
                md="9"              
              >
                <v-text-field
                  label="Nome*"
                  required
                  variant="underlined"
                  style="padding: 0px 8px;"
                  v-model="form.Nome"
                  :rules="rules.nome"
                  :counter="50"
                  maxlength="50"                  
                  
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="2"
                class="status"
              >             
                <v-checkbox
                  v-model="form.Ativo"
                  label="Ativo"
                  color="info"
                  :true-value="true"
                  :false-value="false"
                  hide-details
                  class="checkbox-status"
                />              
              </v-col>

              <v-col
                cols="12"
                md="8"
              >
                <v-text-field                
                  label="E-mail*"
                  required
                  variant="underlined"
                  v-model="form.Email"
                  :rules="rules.email"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4" >
                <VueDatePicker              
                  v-model="form.Contratacao"
                  placeholder="Contratação*"
                  :locale="'pt-BR'"                  
                  select-text="Escolher"
                  cancel-text="Cancelar"
                  today-text="Hoje"
                  now-text="Agora"
                  auto-apply
                  text-input
                  :clearable="false"
                  :enable-time-picker="false"
                  input-class="datepicker-input"
                  
                />

              </v-col>

              <v-col
                cols="12"
                md="3"             
              >
                <v-text-field                
                  label="CPF*"
                  required
                  variant="underlined"
                  v-model="form.CPF"
                  :rules="rules.cpf"                  
                  maxlength="14"  
                  v-maska="'###.###.###-##'"                  
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="6"
                sm="6"
              >
                <v-text-field
                  label="Logradouro*"
                  required
                  variant="underlined"
                  v-model="form.Logradouro"
                  :rules="rules.logradouro"
                  :counter="100"
                  maxlength="100"  
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-text-field
                  label="Bairro*"
                  required
                  variant="underlined"
                  v-model="form.Bairro"
                  :rules="rules.bairro"
                  :counter="50"
                  maxlength="50"  
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="Cidade*"
                  required
                  variant="underlined"
                  v-model="form.Cidade"
                  :rules="rules.cidade"
                  :counter="50"
                  maxlength="50"  
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="6"
              >
              <v-select
                clearable
                label="Estado*"
                required
                variant="underlined"
                :items="Estados.brasil"  
                v-model="form.UF"      
                :rules="rules.uf"  
                :counter="50"
                maxlength="50"      
              ></v-select>              
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="CEP*"
                  required
                  variant="underlined"
                  v-model="form.CEP"
                  :rules="rules.cep"                        
                  maxlength="9"  
                  v-maska="'#####-###'"
                ></v-text-field>
              </v-col>

            </v-row>              
         </v-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Fechar"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="green"
            text="Salvar"
            variant="tonal"
            @click="submit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, defineExpose, } from 'vue'
  import dayjs from 'dayjs';
  import 'dayjs/locale/pt-br';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { vMaska } from "maska/vue";

  import Estados from '@/data/estadosBrasil.json';
  import {NewEmployee} from '@/api/funcionario.js';  

  const valid = ref(false);      
  const imageUrl = ref(null);
  const formRef = ref(null);
  const dialog = ref(false);       

  const rules = {
    nome: [
      (v) => !!v || 'Nome é obrigatório',
    ],
    email: [
      (v) => !!v || 'E-mail é obrigatório',
      (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
    ],
    cpf: [
      (v) => !!v || 'CPF é obrigatório',
      
    ],
    logradouro: [
      (v) => !!v || 'Endereço é obrigatório',
    ],
    bairro: [
      (v) => !!v || 'Bairro é obrigatório',
    ],
    cidade: [
      (v) => !!v || 'Cidade é obrigatório',
    ],
    uf: [
      (v) => !!v || 'Estado(UF) é obrigatório',
    ],
    cep: [
      (v) => !!v || 'Cep é obrigatório',
    ]
  }

  const form = ref({
      Avatar: null,
      Nome: null,
      Email: null,
      CPF: null,
      Ativo: true,
      Contratacao: dayjs().format('YYYY-MM-DD'),
      Logradouro: null,
      Bairro: null,
      Cidade: null,
      UF: null,
      CEP: null      
  });

  const openDialog = (data) => {        
      dialog.value = true;  
      clearForm();          
  }  

  const onFileChange = (e)=> {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl.value = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  const clearForm = () =>{
    form.value = {
        Avatar: null,
        Nome: null,
        Email: null,
        CPF: null,
        Ativo: true,
        Contratacao: dayjs().format('YYYY-MM-DD'),
        Logradouro: null,
        Bairro: null,
        Cidade: null,
        UF: null,
        CEP: null        
    }
  }

  const submit = async ()=>{    
    formRef.value.validate()    
    if(!valid.value)
      return;

      const data = new FormData();      
      data.append('Nome', form.value.Nome);
      data.append('Email', form.value.Email);
      data.append('CPF', form.value.CPF);
      data.append('Ativo', form.value.Ativo);
      data.append('Contratacao', form.value.Contratacao);
      data.append('Logradouro', form.value.Logradouro);
      data.append('Bairro', form.value.Bairro);
      data.append('Cidade', form.value.Cidade);
      data.append('UF', form.value.UF);
      data.append('CEP', form.value.CEP);
      
      const fileInput = document.getElementById('file-upload');
      if (fileInput.files[0]) {
        data.append('Avatar', fileInput.files[0]);
      }

      try{        
        await NewEmployee(data);
        clearForm();
      }catch(err){
        toast(err?.response?.data || "Resposta inesperada!", {
          "theme": "light",
          "type": "error",
          "transition": "zoom",
          "dangerouslyHTMLString": true
        });
      }
    
  }

  defineExpose({
      openDialog
  });
</script>

<style scoped>
    .modal-header
    {
      background-color: #1991ee;
      color: white;
      font-size: 18px;
    }    
    .cursor-pointer {
      cursor: pointer;    
    }
    .avatar-container
    {      
      display: flex;
      justify-content: center;      
    }
    .status
    {
      background-color: #1992ee21; 
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: start;
      border-radius: 4px;
     
      border: 1px solid #1991ee;
    }
    .checkbox-status
    {
      font-weight: 600;   
      color: #1991ee;
      text-transform: uppercase;
    }
</style>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="780"
    >
      <v-card>
         <v-card-title class="modal-header">
            <v-icon start size="22">mdi-account-box</v-icon>
            Funcionário
        </v-card-title>

        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="1"              
            >
              <v-avatar color="info" size="x-large">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
              </v-avatar>
            </v-col>

            <v-col
              cols="12"
              md="9"              
            >
              <v-text-field
                label="Nome*"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="2"
            >
              <v-checkbox                
                color="info"
                label="Ativo"
                value="info"
                hide-details
              ></v-checkbox>
            </v-col>

            <v-col
              cols="12"
              md="8"
            >
              <v-text-field                
                label="E-mail*"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" >
              <VueDatePicker              
                v-model="date"
                 placeholder="Contratação*"
                :locale="'pt-BR'"
                :format="formatDate"
                select-text="Escolher"
                cancel-text="Cancelar"
                today-text="Hoje"
                now-text="Agora"
                auto-apply
                text-input
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
              ></v-text-field>
            </v-col>

          </v-row>
          
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
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
    import { shallowRef, ref, defineExpose, } from 'vue'
    import dayjs from 'dayjs';
	  import 'dayjs/locale/pt-br';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import Estados from '@/data/estadosBrasil.json';

    const date = ref(null);    
    const address = ref(null);
    const dialog = shallowRef(false)             
    

    const openDialog = (data) => {        
        dialog.value = true;
        address.value = data;
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
</style> 
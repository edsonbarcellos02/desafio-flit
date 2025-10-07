<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="550"
      persistent
    >      
      <v-card        
      >
        <v-card-title class="modal-header">
            <v-icon start size="22">mdi-map-marker</v-icon>
            Endereço
        </v-card-title>

        <v-container>
            <v-row>
                <v-col cols="12" sm="12" >        
                    <v-text-field
                        v-model="address.Logradouro"
                        readonly
                        label="Logradouro"
                        prepend-inner-icon="mdi-map-marker"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" >        
                    <v-text-field
                        v-model="address.Bairro"
                        readonly
                        label="Bairro"
                        prepend-inner-icon="mdi-nature"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" >        
                    <v-text-field
                        v-model="address.Cidade"
                        readonly
                        label="Cidade"
                        prepend-inner-icon="mdi-city"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" >        
                    <v-text-field
                        v-model="address.UF"
                        readonly
                        label="Estado"
                        prepend-inner-icon="mdi-map-check"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" >        
                    <v-text-field
                        v-model="address.CEP"
                        readonly
                        label="CEP"
                        prepend-inner-icon="mdi-compass"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>


        <template v-slot:actions>
          <v-spacer></v-spacer>          
          <v-btn variant="tonal" color="#607d8b" @click="dialog = false">
            Fechar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
    import { ref, defineExpose, defineProps } from 'vue'
    
    const dialog = ref(false);
    const address = ref(null);
    
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
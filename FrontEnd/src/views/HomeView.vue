<template>
	<v-card flat class="mb-4">
		<v-card-title class="d-flex align-center pe-2">      
		<v-text-field
			v-model="search"
			density="compact"
			label="Busca rápida"
			prepend-inner-icon="mdi-magnify"
			variant="solo-filled"
			flat
			hide-details
			single-line		
		></v-text-field>
		
		<v-col cols="auto">
			<v-btn @click="modalEmployee" variant="tonal" color="#1991ee" class="btn-new">Novo Funcionário</v-btn>
		</v-col>
		</v-card-title>
	</v-card>

  	<v-data-table
      	v-model:search="search"
      	:filter-keys="['name']"
      	:items="data"
		:headers="headers"          
		:style="{ height: tableHeight + 'px' }"
    >
	   <template v-slot:item.image="{ item }">
			<v-avatar size="40px">
				<v-img
					alt="John"					
					:src="`${item.avatar}?${Math.floor(Math.random() * 999)}`"
				></v-img>
			</v-avatar>
      	</template>
		<template v-slot:item.CPF="{ item }">
			<div class="text-start">@{{ item.CPF }}</div>
		</template>	
		<template v-slot:item.Ativo="{ item }">
			<v-chip variant="tonal" :color="item.Ativo ? 'green' : 'red'">
				{{ item.Ativo ? "Ativo" : "Inativo" }}
			</v-chip>			
		</template>	
		<template v-slot:item.Contratacao="{ item }">
			<div class="text-start">{{ dayjs(item.Contratacao).format('DD/MM/YYYY') }}</div>
		</template>	
		<template v-slot:item.actions="{ item }">
			<div class="d-flex align-center" style="gap: 10px;">
				<v-tooltip text="Endereço" location="top" v-slot:activator="{ props }">
					<v-btn @click="showAddress(item)" size="x-small" icon color="orange" variant="outlined" v-bind="props">
						<v-icon size="20">mdi-map-marker</v-icon>
					</v-btn>
				</v-tooltip>
				<v-tooltip text="Editar" location="top" v-slot:activator="{ props }">
					<v-btn @click="modalEmployee(item)" size="x-small" icon color="blue" variant="outlined" v-bind="props">
						<v-icon size="20">mdi-pencil-box</v-icon>
					</v-btn>
				</v-tooltip>
			</div>
		</template>
    </v-data-table>

	 <ModalAddress ref="addressRef"/>
	 <ModalEmployee :getList="getList" ref="employeeRef"/>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import dayjs from 'dayjs';
	import 'dayjs/locale/pt-br';
 	import { toast } from "vue3-toastify";
  	import "vue3-toastify/dist/index.css";

	import ModalAddress from '@/components/ModalAddress.vue';
	import ModalEmployee from '@/components/ModalEmployee.vue';
	import { GetList } from '@/api/funcionario.js';

	const search = ref('');
	const data = ref([]);
	const addressRef = ref(null);
	const employeeRef = ref(null);
	const tableHeight = ref(window.innerHeight - 200);

	const headers = [
		{ text: '', value: 'image', align: 'center', sortable: false },
		{ title: 'Nome', align: 'start', key: 'Nome'},	
		{ title: 'E-mail', align: 'start', key: 'Email'},	
		{ title: 'CPF', align: 'start', key: 'CPF'},	
		{ title: 'Status', align: 'start', key: 'Ativo'},	
		{ title: 'Contratação', align: 'start', key: 'Contratacao'},
		{ key: 'actions', sortable: false },
	];	
	
	const showAddress = (item) => {
      	addressRef.value?.openDialog(item);
    };
	const modalEmployee = (item) => {		
      	employeeRef.value?.openDialog(item);
    };

	const getList = async () => {	
		try {
			data.value = await GetList();
		} catch (err) {
			toast(err?.response?.data || "Resposta inesperada!", {
				"theme": "light",
				"type": "error",
				"transition": "zoom",
				"dangerouslyHTMLString": true	
			});
		}
	}

	onMounted(() => {
		getList();		
	});

</script>

<style scoped>
	.btn-new
	{
		height: 40px !important;
	}	
	::v-deep(table thead tr th)
	{		
		font-weight: 600 !important;
		color: #f0f0f0 !important;
		background-color: #199ef2;		
	}		
</style>

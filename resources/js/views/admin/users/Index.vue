<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">

                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Ejercicios</h5>
                </div>

                    <DataTable v-model:filters="filters" :value="users.data" paginator :rows="5"
                               :globalFilterFields="['id','alias', 'name','surname1','surname2','email','created_at','type.name']" stripedRows dataKey="id" size="small">

                        <template #header>
                            <Toolbar pt:root:class="toolbar-table">
                                <template #start>
                                    <IconField >
                                        <InputIcon class="pi pi-search"> </InputIcon>
                                        <InputText v-model="filters['global'].value" placeholder="Buscar" />
                                    </IconField>

                                    <Button type="button" icon="pi pi-filter-slash" label="Clear" class="ml-1" outlined @click="initFilters()" />
                                    <Button type="button" icon="pi pi-refresh" class="h-100 ml-1" outlined @click="getUsers()" />
                                </template>
                                <template #end>
                                    <Button v-if="can('exercise-create')" icon="pi pi-external-link" label="Crear Usuario" @click="$router.push('users/create')" class="float-end" />
                                </template>
                            </Toolbar>
                            <!--
                            <div class="flex justify-content-between flex-column sm:flex-row">

                                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />

                                <div class="float-end">

                                </div>

                            </div>
                            -->
                        </template>

                        <template #empty> No customers found. </template>

                        <Column field="id" header="ID" sortable></Column>
                        <Column field="alias" header="Alias" sortable></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="surname1" header="Apellido1" sortable></Column>
                        <Column field="surname2" header="Apellido2" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="created_at" header="Creado el" sortable></Column>

<!--                        <Column header="categories" sortable-->
<!--                                sortField="categories.name"-->
<!--                                filterField="categories"-->
<!--                                :showFilterMatchModes="false">-->
<!--                            <template #body="slotProps">-->
<!--                            <span v-for="cat in slotProps.data.categories" class="ms-2 badge  bg-secondary bg-gradient">-->
<!--                                {{ cat.name }}-->
<!--                            </span>-->
<!--                            </template>-->

<!--                        </Column>-->

                        <Column class="pe-0 me-0 icon-column-2">
                            <template #body="slotProps">

<!--                                <router-link :to="{ name: 'users.tasks', params: { id: slotProps.data.id } }">-->
<!--                                    <Button icon="pi pi-eye"  severity="help" size="small" class="mr-1"/>-->
<!--                                </router-link>-->

                                <router-link v-if="can('user-edit')" :to="{ name: 'users.edit', params: { id: slotProps.data.id } }">
                                    <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1"/>
                                </router-link>

                                <Button icon="pi pi-trash" severity="danger" v-if="can('user-delete')" @click.prevent="deleteUser(slotProps.data.id, slotProps.index)" size="small"/>

                            </template>
                        </Column>

                    </DataTable>

            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import useUsers from "../../../composables/users";
import {useAbility} from '@casl/vue'
import {FilterMatchMode, FilterService} from "@primevue/core/api";

const {users, getUsers, deleteUser, resetUserDB} = useUsers()
const {can} = useAbility()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

onMounted(() => {
    getUsers()
})

</script>

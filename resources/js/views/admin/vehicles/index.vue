<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">

                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Vehicles</h5>
                </div>

                <DataTable v-model:filters="filters" :value="vehiclesList" paginator :rows="5"
                    :globalFilterFields="['id', 'user_id', 'plate', 'brand', 'model', 'consumption', 'pax_number', 'validation', 'fuel_type']"
                    stripedRows dataKey="id" size="small">

                    <template #header>
                        <Toolbar pt:root:class="toolbar-table">
                            <template #start>
                                <IconField>
                                    <InputIcon class="pi pi-search"> </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Buscar" />
                                </IconField>

                                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="ml-1" outlined
                                    @click="initFilters()" />
                                <Button type="button" icon="pi pi-refresh" class="h-100 ml-1" outlined
                                    @click="refreshVehicles()" />
                            </template>
                            <template #end>
                                <Button icon="pi pi-external-link" label="Crear Vehiculo"
                                    @click="$router.push('vehicles/create')" class="float-end" />
                            </template>
                        </Toolbar>
                    </template>

                    <template #empty> No customers found. </template>

                    <Column field="id" header="ID" sortable></Column>
                    <Column field="user_id" header="User_id" sortable></Column>
                    <Column field="plate" header="Plate" sortable></Column>
                    <Column field="brand" header="Brand" sortable></Column>
                    <Column field="model" header="Model" sortable></Column>
                    <Column field="consumption" header="Consumption" sortable></Column>
                    <Column field="pax_number" header="Pax_number" sortable></Column>
                    <Column field="validation" header="Validation" sortable></Column>
                    <Column field="fuel_type" header="Fuel_type" sortable></Column>
                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">
                            <router-link v-if="can('user-edit')"
                                :to="{ name: 'vehicles.edit', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1" />
                            </router-link>
                            <Button icon="pi pi-trash" severity="danger" v-if="can('user-delete')"
                                @click="deleteVehicleAdmin(slotProps.data)" size="small" />
                        </template>
                    </Column>

                </DataTable>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useVehicles from "../../../composables/vehicles";
import { useAbility } from '@casl/vue'
import { FilterMatchMode, FilterService } from "@primevue/core/api";

const { vehiclesList, getVehiclesAdmin, deleteVehicle } = useVehicles()
const { can } = useAbility()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

onMounted(() => {
    getVehiclesAdmin();
})

const deleteVehicleAdmin = async (vehicle) => {
    await deleteVehicle(vehicle).then(() => {
        refreshVehicles();
    });
}

const refreshVehicles = () =>{
    vehiclesList.value = [];
    getVehiclesAdmin();
}

</script>

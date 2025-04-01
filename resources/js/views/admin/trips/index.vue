<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">

                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Viajes</h5>
                </div>

                <DataTable v-model:filters="filters" :value="tripsList" paginator :rows="5"
                    :globalFilterFields="['id', 'user_id', 'vehicle_id', 'start_point', 'end_point', 'departure_time', 'arrival_time', 'available_seats', 'price', 'cancelled_at', 'created_at', 'update_at', 'drive_start', 'drive_end']"
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
                                    @click="getVehicles()" />
                            </template>
                            <template #end>
                                <Button icon="pi pi-external-link" label="Crear Vehiculo"
                                    @click="$router.push('vehicles/create')" class="float-end" />
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
                    <Column field="user_id" header="User_id" sortable></Column>
                    <Column field="plate" header="Plate" sortable></Column>
                    <Column field="brand" header="Brand" sortable></Column>
                    <Column field="model" header="Model" sortable></Column>
                    <Column field="consumption" header="Consumption" sortable></Column>
                    <Column field="pax_number" header="Pax_number" sortable></Column>
                    <Column field="validation" header="Validation" sortable></Column>
                    <Column field="fuel_type" header="Fuel_type" sortable></Column>
                    <Column field="created_at" header="Created_at" sortable></Column>
                    <Column field="update_at" header="Update_at" sortable></Column>
                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">
                            <router-link v-if="can('user-edit')"
                                :to="{ name: 'vehicles.edit', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1" />
                            </router-link>
                            <Button icon="pi pi-trash" severity="danger" v-if="can('user-delete')"
                                @click="deleteVehicleWithID(slotProps.data.id)" size="small" />
                        </template>
                    </Column>

                </DataTable>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useTrips from "../../../composables/trips";
import { useAbility } from '@casl/vue'
import { FilterMatchMode, FilterService } from "@primevue/core/api";

const { tripsList, getTrips } = useTrips()
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
    getTrips();
    // console.log("trips", tripsList.value);
})


</script>

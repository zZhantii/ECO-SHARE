<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">

                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Viajes</h5>
                </div>

                <DataTable v-model:filters="filters" :value="tripsList" paginator :rows="5"
                    :globalFilterFields="['id', 'user_id', 'vehicle_id', 'start_point', 'end_point', 'departure_time', 'arrival_time', 'available_seats', 'price']"
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
                                    @click="refreshTrips()" />
                            </template>
                            <template #end>
                                <Button icon="pi pi-external-link" label="Crear Vehiculo"
                                    @click="$router.push('trips/create')" class="float-end" />
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
                    <Column field="user_id" header="User ID" sortable></Column>
                    <Column field="vehicle_id" header="Vehicle ID" sortable></Column>
                    <Column field="start_point" header="Start Point" sortable></Column>
                    <Column field="end_point" header="End Point" sortable></Column>
                    <Column field="departure_time" header="Departure Time" sortable></Column>
                    <Column field="arrival_time" header="Arrival Time" sortable></Column>
                    <Column field="available_seats" header="Available Seats" sortable></Column>
                    <Column field="price" header="Price" sortable></Column>

                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">
                            <router-link v-if="can('user-edit')"
                                :to="{ name: 'trips.edit', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1" />
                            </router-link>
                            <Button icon="pi pi-trash" severity="danger" v-if="can('user-delete')"
                                @click="deleteTripAdmin(slotProps.data)" size="small" />
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
import { useToast } from "primevue/usetoast";
import { FilterMatchMode, FilterService } from "@primevue/core/api";

const toast = useToast()

const { tripsList, getTrips, deleteTrip } = useTrips()
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
})

const deleteTripAdmin = async (trip2) => {
    await deleteTrip(trip2);
    refreshTrips();
}

const refreshTrips = () => {
    tripsList.value = [];
    getTrips();
}


</script>

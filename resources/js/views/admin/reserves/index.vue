<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Reservas</h5>
                </div>
                <DataTable v-model:filters="filters" :value="reserves" paginator :rows="10"
                    :globalFilterFields="['id', 'user_id', 'trip_id', 'seats_reserved', 'reservation_date', 'check_in']"
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
                                    @click="refreshReserves()" />
                            </template>
                            <template #end>
                                <Button icon="pi pi-external-link" label="Crear Reserva"
                                    @click="$router.push('reserves/create')" class="float-end" />
                            </template>
                        </Toolbar>
                    </template>

                    <template #empty> No customers found. </template>
                    <Column field="id" header="id" sortable></Column>
                    <Column field="user_id" header="User_id" sortable></Column>
                    <Column field="trip_id" header="Trip_id" sortable></Column>
                    <Column field="seats_reserved" header="Seats_reserved" sortable></Column>
                    <Column field="reservation_date" header="Reservation_date" sortable></Column>
                    <Column field="check_in" header="Check_in" sortable></Column>
                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">
                            <router-link v-if="can('user-edit')"
                                :to="{ name: 'reserves.edit', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1" />
                            </router-link>
                            <Button icon="pi pi-trash" severity="danger" v-if="can('user-delete')"
                                @click="deleteReserveAdmin(slotProps.data)" size="small" />
                        </template>
                    </Column>

                </DataTable>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterService } from "@primevue/core/api";

import { useAbility } from '@casl/vue'
const { can } = useAbility()

import useReserves from "@/composables/reserves.js"
const { fetchReserves, reserves, deleteReserve } = useReserves();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

onMounted(() => {
    fetchReserves();
})

const deleteReserveAdmin = (reserve2) => {
    deleteReserve(reserve2);
}

const refreshReserves = () => {
    reserves.value = [];
    fetchReserves();
}


</script>

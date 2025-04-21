<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Reservas</h5>
                </div>

                <DataTable v-model:filters="filters" :value="dataReserves" paginator :rows="10"
                    :globalFilterFields="['user_id', 'trip_id', 'seats_reserved', 'reservation_date', 'check_in', 'total_price']"
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
                    <Column field="user_id" header="User_id" sortable></Column>
                    <Column field="trip_id" header="Trip_id" sortable></Column>
                    <Column field="seats_reserved" header="Seats_reserved" sortable></Column>
                    <Column field="reservation_date" header="Reservation_date" sortable></Column>
                    <Column field="check_in" header="Check_in" sortable></Column>
                    <Column field="total_price" header="Total_price" sortable></Column>
                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">
                            <router-link v-if="can('user-edit')"
                                :to="{ name: 'reserves.edit', params: { user_id: slotProps.data.user_id, trip_id: slotProps.data.trip_id } }">
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
import { ref, onMounted, computed } from "vue";
import { FilterMatchMode, FilterService } from "@primevue/core/api";

import { useAbility } from '@casl/vue'
const { can } = useAbility()

import useReserves from "@/composables/reserves.js"
const { getReserves, reserveList, deleteReserve } = useReserves();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

onMounted( async () => {
    await getReserves();
})

const dataReserves = computed(() => {
    return reserveList.value.flatMap((reserve) =>
        reserve.reserves.map((reserva2) => {
            return {
                user_id: reserva2.pivot.user_id,
                trip_id: reserva2.pivot.trip_id,
                seats_reserved: reserva2.pivot.seats_reserved,
                reservation_date: reserva2.pivot.reservation_date,
                check_in: reserva2.pivot.check_in,
                total_price: reserva2.pivot.total_price,
            };
        })
    );
});


const deleteReserveAdmin = async (reserve2) => {
    await deleteReserve(reserve2)
    refreshReserves();
}

const refreshReserves = () => {
    reserveList.value = [];
    getReserves();
}


</script>

<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2">
                <div class="surface-card p-4 shadow-2 rounded-4 ">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Crear Viaje</h2>
                        <span class="text-600 font-medium">Por favor, complete los datos del viaje</span>
                    </div>

                    <div class="grid">
                        <div class="col-12 md:col-6 mb-4">
                            <label for="user_id" class="block text-900 font-medium mb-2">Usuario</label>
                            <Select v-model="trip.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" class="w-full"
                                :class="{ 'p-invalid': validationErrors.user_id }" placeholder="Seleccionar Usuario">
                            </Select>
                            <small v-if="validationErrors.user_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="vehicle_id" class="block text-900 font-medium mb-2">Vehículo</label>
                            <Select v-model="trip.vehicle_id" :options="vehiclesList" filter optionLabel="brand"
                                optionValue="id" dataKey="id" class="w-full"
                                :class="{ 'p-invalid': validationErrors.vehicle_id }" placeholder="Seleccionar Vehículo"
                                @update:model-value="selectAvailable_seats">
                            </Select>
                            <small v-if="validationErrors.vehicle_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.vehicle_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <!-- <div class="col-12 md:col-6 mb-4">
                            <label for="start_point" class="block text-900 font-medium mb-2">Punto de Partida</label>
                            <InputText v-model="trip.start_point" id="start_point" class="w-full"
                                :class="{ 'p-invalid': validationErrors.start_point }"
                                placeholder="Ingrese el punto de partida" />
                            <small v-if="validationErrors.start_point" class="p-error block mt-1">
                                <div v-for="message in validationErrors.start_point" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="end_point" class="block text-900 font-medium mb-2">Punto de Llegada</label>
                            <InputText v-model="trip.end_point" id="end_point" class="w-full"
                                :class="{ 'p-invalid': validationErrors.end_point }"
                                placeholder="Ingrese el punto de llegada" />
                            <small v-if="validationErrors.end_point" class="p-error block mt-1">
                                <div v-for="message in validationErrors.end_point" :key="message">{{ message }}</div>
                            </small>
                        </div> -->

                        <div class="col-12 md:col-6 mb-4">
                            <label for="departure_time" class="block text-900 font-medium mb-2">Hora de Salida</label>
                            <DatePicker v-model="trip.departure_time" showTime hourFormat="24" class="w-full"
                                :showIcon="true" :class="{ 'p-invalid': validationErrors.departure_time }"
                                placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy" />
                            <small v-if="validationErrors.departure_time" class="p-error block mt-1">
                                <div v-for="message in validationErrors.departure_time" :key="message">{{ message }}
                                </div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="arrival_time" class="block text-900 font-medium mb-2">Hora de Llegada</label>
                            <DatePicker v-model="trip.arrival_time" showTime hourFormat="24" class="w-full"
                                :showIcon="true" :class="{ 'p-invalid': validationErrors.arrival_time }"
                                placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy" />
                            <small v-if="validationErrors.arrival_time" class="p-error block mt-1">
                                <div v-for="message in validationErrors.arrival_time" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="available_seats" class="block text-900 font-medium mb-2">Asientos
                                Disponibles</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="trip.available_seats" id="available_seats" :min="0"
                                    :max="available_seats" showButtons class="w-full"
                                    :class="{ 'p-invalid': validationErrors.available_seats }" />
                            </div>
                            <small v-if="validationErrors.available_seats" class="p-error block mt-1">
                                <div v-for="message in validationErrors.available_seats" :key="message">{{ message }}
                                </div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="price" class="block text-900 font-medium mb-2">Precio</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="trip.price" id="price" :minFractionDigits="2"
                                    :maxFractionDigits="2" placeholder="0.00" class="w-full"
                                    :class="{ 'p-invalid': validationErrors.price }" mode="currency"
                                    currency="EUR" locale="es-ES">
                                </InputNumber>
                            </div>
                            <small v-if="validationErrors.price" class="p-error block mt-1">
                                <div v-for="message in validationErrors.price" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="drive_start" class="block text-900 font-medium mb-2">Inicio de
                                Conducción</label>
                            <DatePicker v-model="trip.drive_start" showTime hourFormat="24" class="w-full"
                                :showIcon="true" placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy" />
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="drive_end" class="block text-900 font-medium mb-2">Fin de Conducción</label>
                            <DatePicker v-model="trip.drive_end" showTime hourFormat="24" class="w-full"
                                :showIcon="true" placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy" />
                        </div>
                    </div>

                    <div class="flex justify-content-end">
                        <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                        <Button label="Guardar" icon="pi pi-check" :loading="loading" @click="submitAddTrip" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
// VUE
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Composables
import useTrips from "@/composables/trips";
import useUsers from "@/composables/users";
import useVehicles from "@/composables/vehicles";

const { createTrip, trip, validationErrors, TripSchema } = useTrips();
const { getUsers, users } = useUsers();
const { getVehiclesAdmin, vehiclesList, getVehicle, vehicle } = useVehicles();

onMounted(async () => {
    await getUsers();
    await getVehiclesAdmin();
});

const available_seats = ref(null);

const selectAvailable_seats = async (vehicle_id) => {
    await getVehicle(vehicle_id);
    available_seats.value = vehicle.value.pax_number;
}

const submitAddTrip = async () => {
    try {
        await TripSchema.validate(trip.value, { abortEarly: false })
        .then(() => {
            createTrip(trip);
        });
        router.back();
    } catch (error) {
        validationErrors.value = {}
        error.inner.forEach((e) => {
            if (!validationErrors.value[e.path]) {
                validationErrors.value[e.path] = [];
            }
            validationErrors.value[e.path].push(e.message);
        });
    }
}
</script>

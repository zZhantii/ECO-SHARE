<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 rounded-4 ">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Editar Reserva</h2>
                        <span class="text-600 font-medium">Modifique los datos de la reserva</span>
                    </div>

                    <div v-if="reserve && reserve.pivot">
                        <div class="mb-4">
                            <label for="reserve.user_id" class="block text-900 font-medium mb-2">Usuario</label>
                            <Select v-model="reserve.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" placeholder="Seleccionar Usuario" class="w-full"
                                :class="{ 'p-invalid': validationErrors.user_id }">
                            </Select>
                            <small v-if="validationErrors.user_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="reserve.pivot.trip_id" class="block text-900 font-medium mb-2">Viaje</label>
                            <Select v-model="reserve.pivot.trip_id" :options="tripsList" filter
                                :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                                optionValue="id" dataKey="id" placeholder="Seleccionar Viaje" class="w-full"
                                :class="{ 'p-invalid': validationErrors.trip_id }"
                                @update:model-value="selectAvailable_seats">
                            </Select>
                            <small v-if="validationErrors.trip_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.trip_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="seats_reserved" class="block text-900 font-medium mb-2">Sitios
                                Reservados</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="reserve.pivot.seats_reserved" id="seats_reserved" :min="0"
                                    :max="available_seats" placeholder="Número de asientos" class="w-full"
                                    :class="{ 'p-invalid': validationErrors.seats_reserved }" showButtons>
                                </InputNumber>
                            </div>
                            <small v-if="validationErrors.seats_reserved" class="p-error block mt-1">
                                <div v-for="message in validationErrors.seats_reserved" :key="message">{{ message }}
                                </div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="reservation_date" class="block text-900 font-medium mb-2">Fecha de
                                Reserva</label>
                            <DatePicker v-model="reserve.pivot.reservation_date" showTime hourFormat="24" class="w-full"
                                :showIcon="true" :class="{ 'p-invalid': validationErrors.reservation_date }"
                                placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy">
                            </DatePicker>
                            <small v-if="validationErrors.reservation_date" class="p-error block mt-1">
                                <div v-for="message in validationErrors.reservation_date" :key="message">{{ message }}
                                </div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="check_in" class="block text-900 font-medium mb-2">Check In</label>
                            <DatePicker v-model="reserve.pivot.check_in" showTime hourFormat="24" class="w-full"
                                :showIcon="true" :class="{ 'p-invalid': validationErrors.check_in }"
                                placeholder="Seleccionar fecha y hora" dateFormat="dd/mm/yy">
                            </DatePicker>
                            <small v-if="validationErrors.check_in" class="p-error block mt-1">
                                <div v-for="message in validationErrors.check_in" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="total_price" class="block text-900 font-medium mb-2">Precio Total</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="reserve.pivot.total_price" id="total_price" :minFractionDigits="2"
                                    :maxFractionDigits="2" placeholder="0.00" class="w-full"
                                    :class="{ 'p-invalid': validationErrors.total_price }" mode="currency"
                                    currency="EUR" locale="es-ES">
                                </InputNumber>
                            </div>
                            <small v-if="validationErrors.total_price" class="p-error block mt-1">
                                <div v-for="message in validationErrors.total_price" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="flex justify-content-end">
                            <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                            <Button label="Actualizar" icon="pi pi-check" class="p-button-success" :loading="loading"
                                @click="submitUpdateReserve" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const route = useRoute();
const router = useRouter();

// Composables
import useReserves from "@/composables/reserves";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";
import useVehicles from "@/composables/vehicles";

const { updateReserve, getReserve, reserve, reserveSchema, validationErrors } = useReserves();
const { getUsers, users } = useUsers();
const { getTrips, tripsList } = useTrips();
const { getVehicle, vehicle } = useVehicles();

const available_seats = ref(null);

const selectAvailable_seats = async () => {
    await getVehicle(reserve.value.vehicle_id);
    available_seats.value = vehicle.value.pax_number;
}

onMounted(async () => {
    await getReserve(route.params.user_id, route.params.trip_id);
    await getUsers();
    await getTrips();

})

watch(() => reserve.value.vehicle_id, async (tripId) => {
    await getVehicle(tripId); 
    available_seats.value = vehicle.value.pax_number;
});

const submitUpdateReserve = async () => {
    try {
            await reserveSchema.validate(reserve.value.pivot, { abortEarly: false })
            .then(() => {
                updateReserve(reserve);
            }).then(() => {
                router.push({ name: "reserves.index" });
            })
    } catch (error) {
        if (error.inner) {
            validationErrors.value = {}
            error.inner.forEach((e) => {
                if (!validationErrors.value[e.path]) {
                    validationErrors.value[e.path] = [];
                }
                validationErrors.value[e.path].push(e.message);
            });
        }
    }
}
</script>

<style>
.fu-content {
    padding: 0px !important;
    border: 0px !important;
    border-radius: 6px;
}

.fu-header {
    border: 0px !important;
    border-radius: 6px;
}

.fu {
    display: flex;
    flex-direction: column-reverse;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}


.img-profile {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    aspect-ratio: 1/1;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    margin-bottom: 0.3rem;
}
</style>

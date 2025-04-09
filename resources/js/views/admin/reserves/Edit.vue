<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-5 text-primary">Detalles de Reserva</h4>

                    <div v-if="reserve && reserve.pivot">

                        <div class="form-group">
                            <label for="reserve.user_id">Usuario</label>
                            <Select v-model="reserve.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" class="w-full md:w-56">
                            </Select>
                            <div v-if="validationErrors.user_id" class="text-danger mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reserve.pivot.trip_id">Viajes</label>
                            <Select v-model="reserve.pivot.trip_id" :options="tripsList" filter
                                :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                                optionValue="id" dataKey="id" placeholder="Select a Start Point" class="w-full md:w-56"
                                @update:model-value="(value) => selectAvailable_seats(value)" </Select>
                                <div v-if="validationErrors.trip_id" class="text-danger mt-1">
                                    <div v-for="message in validationErrors.trip_id" :key="message">{{ message }}
                                    </div>
                                </div>
                        </div>

                        <div class="form-group">
                            <label for="seats_reserved">Sitios Reservados</label>
                            <InputNumber v-model="reserve.pivot.seats_reserved" type="text" class="d-flex w-100 w-100"
                                id="seats_reserved" :min="0" :max="available_seats" showButtons />
                            <div v-if="validationErrors.seats_reserved" class="text-danger mt-1">
                                <div v-for="message in validationErrors.seats_reserved" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reservation_date">Fecha de Reserva</label>
                            <DatePicker v-model="reserve.pivot.reservation_date" showTime hourFormat="24" fluid
                                type="text" class="d-flex w-100 w-100" id="reservation_date" />
                            <div v-if="validationErrors.reservation_date" class="text-danger mt-1">
                                <div v-for="message in validationErrors.reservation_date" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="check_in">Check In</label>
                            <DatePicker v-model="reserve.pivot.check_in" showTime hourFormat="24" fluid type="text"
                                class="d-flex w-100 w-100" id="check_in" />
                        </div>

                        <div class="form-group">
                            <label for="total_price">Precio</label>
                            <InputNumber v-model="reserve.pivot.total_price" type="text" class="d-flex w-100 w-100"
                                id="total_price" :minFractionDigits="2" :maxFractionDigits="2" showButtons />
                            <div v-if="validationErrors.total_price" class="text-danger mt-1">
                                <div v-for="message in validationErrors.total_price" :key="message">{{ message }}</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="submitUpdateReserve">Guardar</button>

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

const { updateReserve, getReserveWithId, reserve, reserveSchema, validationErrors } = useReserves();
const { getUsers, users } = useUsers();
const { getTrips, tripsList } = useTrips();
const { getVehicle, vehicle } = useVehicles();

const available_seats = ref(null);

const selectAvailable_seats = async () => {
    await getVehicle(reserve.value.vehicle_id);
    available_seats.value = vehicle.value.pax_number;
}

onMounted(async () => {
    await getReserveWithId(route.params.user_id, route.params.trip_id);
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

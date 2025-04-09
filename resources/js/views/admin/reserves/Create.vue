<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-5 text-primary">Crear Etiqueta</h4>

                    <div v-if="reserve">
                        <div class="form-group">
                            <label for="reserve.user_id">Usuarios</label>
                            <Select v-model="reserve.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" placeholder="Select a User" class="w-full md:w-56">
                            </Select>
                            <div v-if="validationErrors.user_id" class="text-danger mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reserve.trip_id">Viajes</label>
                            <Select v-model="reserve.trip_id" :options="tripsList" filter
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
                            <InputNumber v-model="reserve.seats_reserved" type="text" class="d-flex w-100 w-100"
                                id="seats_reserved" :min="0" :max="available_seats" showButtons />
                            <div v-if="validationErrors.seats_reserved" class="text-danger mt-1">
                                <div v-for="message in validationErrors.seats_reserved" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reservation_date">Fecha de Reserva</label>
                            <DatePicker v-model="reserve.reservation_date" showTime hourFormat="24" fluid type="text"
                                class="d-flex w-100 w-100" id="reservation_date" />
                            <div v-if="validationErrors.reservation_date" class="text-danger mt-1">
                                <div v-for="message in validationErrors.reservation_date" :key="message">{{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="check_in">Check In</label>
                            <DatePicker v-model="reserve.check_in" showTime hourFormat="24" fluid type="text"
                                class="d-flex w-100 w-100" id="check_in" />
                            <div v-if="validationErrors.check_in" class="text-danger mt-1">
                                <div v-for="message in validationErrors.check_in" :key="message">{{ message }}</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="total_price">Precio Total</label>
                            <InputNumber v-model="reserve.total_price" type="text" class="d-flex w-100 w-100"
                                id="total_price" :minFractionDigits="2" :maxFractionDigits="5" showButtons />
                            <div v-if="validationErrors.total_price" class="text-danger mt-1">
                                <div v-for="message in validationErrors.total_price" :key="message">{{ message }}</div>
                            </div>
                        </div>
                        <button class="btn btn-primary" @click="submitAddReserve">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
// VUE
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Composables
import useReserves from "@/composables/reserves";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";
import useVehicles from "@/composables/vehicles";

const { reserveSchema, reserve, createReserve, validationErrors } = useReserves();
const { getTrips, tripsList } = useTrips();
const { getUsers, users } = useUsers();
const { getVehicle, vehicle } = useVehicles();

const available_seats = ref(null);

const selectAvailable_seats = async (tripID) => {
    await getVehicle(tripID);
    available_seats.value = vehicle.value.pax_number;
}

onMounted(async () => {
    await getUsers();
    await getTrips();
});

const formatToDate = (date) => {
    if (!date) return null; 
    return date.toISOString().split('T')[0];
};

const submitAddReserve = async () => {
    try {
        await reserveSchema.validate(reserve.value, { abortEarly: false })
        .then(() => {
            createReserve(reserve);
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

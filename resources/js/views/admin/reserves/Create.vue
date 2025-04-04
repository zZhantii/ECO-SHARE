<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Crear Etiqueta</h6>
                    <div class="form-group">
                        <Select v-model="reserve.user_id" :options="users.data" filter optionLabel="name"
                            optionValue="id" dataKey="id" placeholder="Select a User" class="w-full md:w-56">
                        </Select>
                    </div>

                    <div class="form-group">
                        <Select v-model="reserve.trip_id" :options="tripsList" filter
                            :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                            optionValue="id" dataKey="id" placeholder="Select a Start Point" class="w-full md:w-56"
                            @update:model-value="(value) => selectAvailable_seats(value)" </Select>
                    </div>

                    <div class="form-group">
                        <label for="seats_reserved">Seats Reserved</label>
                        <InputNumber v-model="reserve.seats_reserved" type="text" class="d-flex w-100 w-100"
                            id="seats_reserved" :min="0" :max="available_seats" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="reservation_date">Reservation Date</label>
                        <DatePicker v-model="reserve.reservation_date" type="text" class="d-flex w-100 w-100"
                            id="reservation_date" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="check_in">Check In</label>
                        <InputNumber v-model="reserve.check_in" type="text" class="d-flex w-100 w-100" id="check_in"
                            :min="0" :max="1" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" @click="submitAddReserve">Guardar</button>
    <Toast />
</template>
<script setup>
// VUE
import { ref, onMounted } from "vue";

// Composables
import useReserves from "@/composables/reserves";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";
import useVehicles from "@/composables/vehicles";

const { reserveSchema, reserve, createReserve } = useReserves();
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
    if (!date) return null; // Manejar casos donde la fecha sea nula o indefinida
    return date.toISOString().split('T')[0]; // Convierte la fecha a 'YYYY-MM-DD'
};

const submitAddReserve = async () => {
    reserve.value.reservation_date = formatToDate(reserve.value.reservation_date);
    await reserveSchema.validate(reserve.value, { abortEarly: false })
        .then(() => {
            createReserve(reserve);
        })
}


</script>

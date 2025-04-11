<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-2 text-primary">Vehicles Details</h4>

                    <div class="form-group my-4 ">
                        <label for="user_id">Usuarios</label>
                        <Select v-model="trip.user_id" :options="users.data" filter optionLabel="name" optionValue="id"
                            dataKey="id" class="w-full md:w-56">
                        </Select>
                        <div v-if="validationErrors.user_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="vehicle_id">Vehiculos</label>
                        <Select v-model="trip.vehicle_id" :options="vehiclesList" filter optionLabel="brand"
                            optionValue="id" dataKey="id" class="w-full md:w-56"
                            @update:model-value="(value) => selectAvailable_seats(value)">
                        </Select>
                        <div v-if="validationErrors.vehicle_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.vehicle_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="start_point">start_point</label>
                        <InputText v-model="trip.start_point" type="text" class="d-flex w-100" id="start_point" />
                        <div v-if="validationErrors.start_point" class="text-danger mt-1">
                            <div v-for="message in validationErrors.start_point" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="end_point">end_point</label>
                        <InputText v-model="trip.end_point" type="text" class="d-flex w-100" id="end_point" />
                        <div v-if="validationErrors.end_point" class="text-danger mt-1">
                            <div v-for="message in validationErrors.end_point" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="departure_time">departure_time</label>
                        <DatePicker v-model="trip.departure_time" showTime hourFormat="24" fluid type="text"
                            class="d-flex w-100" id="departure_time" />
                        <div v-if="validationErrors.departure_time" class="text-danger mt-1">
                            <div v-for="message in validationErrors.departure_time" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="arrival_time">arrival_time</label>
                        <DatePicker v-model="trip.arrival_time" showTime hourFormat="24" fluid class="d-flex w-100"
                            id="arrival_time" />
                        <div v-if="validationErrors.arrival_time" class="text-danger mt-1">
                            <div v-for="message in validationErrors.arrival_time" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="available_seats">available_seats</label>
                        <InputNumber v-model="trip.available_seats" class="d-flex w-100" id="available_seats" :min="0"
                            :max="available_seats" showButtons />
                        <div v-if="validationErrors.available_seats" class="text-danger mt-1">
                            <div v-for="message in validationErrors.available_seats" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="price">price</label>
                        <InputNumber v-model="trip.price" type="number" class="d-flex w-100" id="price"
                            :minFractionDigits="2" :maxFractionDigits="2" showButtons />
                        <div v-if="validationErrors.price" class="text-danger mt-1">
                            <div v-for="message in validationErrors.price" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="drive_start">drive_start</label>
                        <DatePicker v-model="trip.drive_start" type="text" showTime hourFormat="24" fluid
                            class="d-flex w-100" id="drive_start" />
                    </div>

                    <div class="form-group mb-4 ">
                        <label for="drive_end">drive_end</label>
                        <DatePicker v-model="trip.drive_end" type="text" showTime hourFormat="24" fluid
                            class="d-flex w-100" id="drive_end" />
                    </div>
                </div>
            </div>

        </div>
    </div>
    <button class="btn btn-primary" @click="submitAddTrip">Guardar</button>
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
const { getVehicles, vehiclesList, getVehicle, vehicle } = useVehicles();

onMounted(async () => {
    await getUsers();
    await getVehicles();
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

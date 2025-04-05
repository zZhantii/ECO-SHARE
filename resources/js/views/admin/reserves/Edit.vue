<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Reserve Details</h6>

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
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div> -->
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.seats_reserved">
                                {{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="reservation_date">Reservation Date</label>
                        <DatePicker v-model="reserve.reservation_date" type="text" class="d-flex w-100 w-100"
                            id="reservation_date" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div> -->
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.reservation_date">
                                {{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="check_in">Check In</label>
                        <DatePicker v-model="reserve.check_in" type="text" class="d-flex w-100 w-100" id="check_in" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div> -->
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.check_in">
                                {{ message }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" @click="submitUpdateReserve">Guardar</button>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const route = useRoute();

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
    await getVehicle(reserve.value.trip_id);
    available_seats.value = vehicle.value.pax_number;
}

onMounted(async () => {
    await getReserveWithId(route.params.id);
    await getUsers();
    await getTrips();

})

watch(() => reserve.value.trip_id, async (tripId) => {
    await getVehicle(tripId);
    available_seats.value = vehicle.value.pax_number;
});

const submitUpdateReserve = async () => {
    try {
        updateReserve(reserve);
        // reserveSchema.validate(reserve, { abortEarly: false })
        //     .then(() => {
        //         updateReserve(reserve);
        //     })
    } catch (error) {
        if (error.inner) {
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

<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Vehicles Details</h6>

                    <!-- {{ tripList }} -->
                    <!-- {{ startPointStr }} -->

                    <div class="form-group">
                        <label for="user_id">user_id</label>
                        <InputNumber v-model="tripList.user_id" type="number" class="d-flex w-100 w-100" id="user_id"
                            showButtons />
                        <div v-if="validationErrors.user_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="vehicle_id">vehicle_id</label>
                        <InputNumber v-model="tripList.vehicle_id" type="number" class="d-flex w-100" id="vehicle_id"
                            showButtons />
                        <div v-if="validationErrors.vehicle_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.vehicle_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="start_point">Start Point (JSON)</label>
                        <textarea v-model="startPointStr" class="form-control" rows="4" id="start_point" />
                    </div>

                    <div class="form-group">
                        <label for="end_point">end_point</label>
                        <InputText v-model="tripList.end_point" type="text" class="d-flex w-100" id="end_point" />
                        <div v-if="validationErrors.end_point" class="text-danger mt-1">
                            <div v-for="message in validationErrors.end_point" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="departure_time">departure_time</label>
                        <DatePicker v-model="tripList.departure_time" type="text" class="d-flex w-100"
                            id="departure_time" />
                        <div v-if="validationErrors.departure_time" class="text-danger mt-1">
                            <div v-for="message in validationErrors.departure_time" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="arrival_time">arrival_time</label>
                        <DatePicker v-model="tripList.arrival_time" class="d-flex w-100" id="arrival_time" />
                        <div v-if="validationErrors.arrival_time" class="text-danger mt-1">
                            <div v-for="message in validationErrors.arrival_time" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="available_seats">available_seats</label>
                        <InputNumber v-model="tripList.available_seats" class="d-flex w-100" id="available_seats"
                            showButtons />
                        <div v-if="validationErrors.available_seats" class="text-danger mt-1">
                            <div v-for="message in validationErrors.available_seats" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="price">price</label>
                        <InputNumber v-model="tripList.price" type="number" class="d-flex w-100" id="price"
                            :minFractionDigits="2" :maxFractionDigits="2" showButtons />
                        <div v-if="validationErrors.price" class="text-danger mt-1">
                            <div v-for="message in validationErrors.price" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="drive_start">drive_start</label>
                        <DatePicker v-model="tripList.drive_start" type="text" class="d-flex w-100" id="drive_start" />
                        <div v-if="validationErrors.drive_start" class="text-danger mt-1">
                            <div v-for="message in validationErrors.drive_start" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="drive_end">drive_end</label>
                        <DatePicker v-model="tripList.drive_end" type="text" class="d-flex w-100" id="drive_end" />
                        <div v-if="validationErrors.drive_end" class="text-danger mt-1">
                            <div v-for="message in validationErrors.drive_end" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <button class="btn btn-primary" @click="submitUpdateVehicle">Guardar</button>
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

// PrimeVue
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Composables
import useTrips from "@/composables/trips";

const { updateTrip, getTrip, trip, tripList, TripSchema, validationErrors } = useTrips();
const startPointStr = ref('');
const endPointStr = ref('');

onMounted(() => {
    getTrip(route.params.id)

    if (tripList.start_point) {
        startPointStr.value = JSON.stringify(tripList.start_point, null, 2);
    } else {
        console.log("")
    }

    if (tripList.end_point) {
        endPointStr.value = JSON.stringify(tripList.start_point, null, 2);
    }

})

const TempTrip = ref({});

const submitUpdateVehicle = async () => {
    try {
        await TripSchema.validate(trip.value, { abortEarly: false })
        .then(() => {
            updateTrip(TempTrip.value);
        });
    } catch (error) {
        console.log("Errores de validación:", error.errors);
        toast.add({
            severity: "info",
            summary: "Errores en el formulario",
            detail: error.errors.join(", "),
            life: 3000,
        });
    }
}

watch(startPointStr, (newVal) => {
    try {
        tripList.start_point = JSON.parse(newVal);
    } catch (e) {
        console.warn("JSON inválido");
    }
});
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

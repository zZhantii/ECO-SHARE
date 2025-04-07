<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Vehicles Details</h6>

                    <div class="form-group">
                        <label for="user_id">user_id</label>
                        <!-- Crear select que salga todos los usuarios_id -->
                        <InputNumber v-model="tripList.user_id" type="number" class="d-flex w-100 w-100" id="user_id"
                            showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <!-- Crear select que salga todos los vehiculos_id -->
                    <div class="form-group">
                        <label for="vehicle_id">vehicle_id</label>
                        <InputNumber v-model="tripList.vehicle_id" type="number" class="d-flex w-100" id="vehicle_id"
                            showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.surname1 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname1">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="start_point">start_point</label>
                        <InputText v-model="tripList.start_point" type="text" class="d-flex w-100" id="start_point" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="end_point">end_point</label>
                        <InputText v-model="tripList.end_point" type="text" class="d-flex w-100" id="end_point" />
                        <!-- <div class="text-danger mt-1">{{ errors.email }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.email">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="departure_time">departure_time</label>
                        <DatePicker v-model="tripList.departure_time" type="text" class="d-flex w-100"
                            id="departure_time" />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="arrival_time">arrival_time</label>
                        <DatePicker v-model="tripList.arrival_time" class="d-flex w-100" id="arrival_time" />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="available_seats">available_seats</label>
                        <InputNumber v-model="tripList.available_seats" class="d-flex w-100" id="available_seats"
                            showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="price">price</label>
                        <InputNumber v-model="tripList.price" type="number" class="d-flex w-100" id="price"
                            :minFractionDigits="2" :maxFractionDigits="2" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="cancelled_at">cancelled_at</label>
                        <DatePicker v-model="tripList.cancelled_at" type="text" class="d-flex w-100" id="cancelled_at" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="created_at">created_at</label>
                        <DatePicker v-model="tripList.created_at" type="text" class="d-flex w-100" id="created_at" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="update_at">update_at</label>
                        <DatePicker v-model="tripList.update_at" type="text" class="d-flex w-100" id="update_at" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="drive_start">drive_start</label>
                        <DatePicker v-model="tripList.drive_start" type="text" class="d-flex w-100" id="drive_start" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="drive_end">drive_end</label>
                        <DatePicker v-model="tripList.drive_end" type="text" class="d-flex w-100" id="drive_end" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
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
import { onMounted, ref } from "vue";
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

const { updateTrip, getTrip, tripList } = useTrips();



onMounted(() => {
    getTrip(route.params.id)

})

const TempTrip = ref({});

const TripSchema = yup.object().shape({
    user_id: yup.number().integer("El User ID debe ser un número entero").required("El User ID es obligatorio"),
    vehicle_id: yup.number().integer("El Vehicle ID debe ser un número entero").required("El Vehicle ID es obligatorio"),
    start_point: yup
        .mixed()
        .test("is-valid-json", "El punto de inicio debe ser un JSON válido", value => {
            if (typeof value === "string" && value === "[object Object]") return true;
            return typeof value === "object" && value !== null;
        })
        .required("El punto de inicio es obligatorio"),

    end_point: yup
        .mixed()
        .test("is-valid-json", "El punto de destino debe ser un JSON válido", value => {
            if (typeof value === "string" && value === "[object Object]") return true;
            return typeof value === "object" && value !== null;
        })
        .required("El punto de destino es obligatorio"),
    departure_time: yup.date().required("La hora de salida es obligatoria"),
    arrival_time: yup.date().required("La hora de llegada es obligatoria"),
    available_seats: yup.number().integer("Debe ser un número entero").min(1, "Debe haber al menos un asiento disponible").required("El número de asientos es obligatorio"),
    price: yup        .number()        .typeError("El precio debe ser un número válido")        .positive("El precio debe ser mayor que 0")        .nullable(false)        .required("El precio es obligatorio"),
    // cancelled_at: yup.date().nullable(),
    // created_at: yup.date().required("La fecha de creación es obligatoria"),
    // update_at: yup.date().required("La fecha de actualización es obligatoria"),
    // drive_start: yup.date().nullable(),
    // drive_end: yup.date().nullable(),
});

const submitUpdateVehicle = async () => {
    try {
        TempTrip.value = { ...tripList.value };
        console.log("Datos a validar:", TempTrip.value);

        await TripSchema.validate(TempTrip.value, { abortEarly: false });

        updateTrip(TempTrip.value);
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

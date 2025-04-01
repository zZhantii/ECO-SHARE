<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Vehicles Details</h6>

                    <div class="form-group">
                        <label for="plate">Plate</label>
                        <InputText v-model="vehicle.plate" type="text" class="d-flex w-100 w-100" id="plate" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="brand">Brand</label>
                        <InputText v-model="tripList.brand" type="text" class="d-flex w-100" id="brand" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname1 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname1">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="model">Model</label>
                        <InputText v-model="tripList.model" type="text" class="d-flex w-100" id="model" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="consumption">Consumption</label>
                        <InputNumber v-model="tripList.consumption" type="float" class="d-flex w-100" id="consumption"
                            :minFractionDigits="1" :maxFractionDigits="1" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.email }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.email">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="pax_number">Pax_number</label>
                        <InputNumber v-model="tripList.pax_number" type="text" class="d-flex w-100" id="pax_number"
                            :min="1" :max="1" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="validation">Validation</label>
                        <InputNumber v-model="tripList.validation" class="d-flex w-100" id="validation" :min="0" :max="1"
                            showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="fuel_type">Fuel_type</label>
                        <SelectButton v-model="tripList.fuel_type" :options="options" aria-labelledby="basic"
                            class="d-flex w-100" id="fuel_type" />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
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
import useVehicles from "@/composables/vehicles";

const { updateTrip, getTrip, tripList } = useVehicles();



onMounted(() => {
    getTrip(route.params.id)

})

const TempTrip = ref({});
const options = ["Gasolina", "Diésel"];

const TripSchema = yup.object().shape({
    id: yup.number().integer("El ID debe ser un número entero").required("El ID es obligatorio"),
    user_id: yup.number().integer("El User ID debe ser un número entero").required("El User ID es obligatorio"),
    vehicle_id: yup.number().integer("El Vehicle ID debe ser un número entero").required("El Vehicle ID es obligatorio"),
    start_point: yup.string().required("El punto de inicio es obligatorio"),
    end_point: yup.string().required("El punto de destino es obligatorio"),
    departure_time: yup.date().required("La hora de salida es obligatoria"),
    arrival_time: yup.date().required("La hora de llegada es obligatoria"),
    available_seats: yup.number().integer("Debe ser un número entero").min(1, "Debe haber al menos un asiento disponible").required("El número de asientos es obligatorio"),
    price: yup.number().positive("El precio debe ser un número positivo").required("El precio es obligatorio"),
    cancelled_at: yup.date().nullable(),
    created_at: yup.date().required("La fecha de creación es obligatoria"),
    update_at: yup.date().required("La fecha de actualización es obligatoria"),
    drive_start: yup.date().nullable(),
    drive_end: yup.date().nullable(),
});

const submitUpdateVehicle = async () => {
    try {
        TempTrip.value = { ...tripList.value };
        console.log(TempTrip.value);
        await TripSchema.validate({
            plate: TempTrip.value.plate,
            brand: TempTrip.value.brand,
            model: TempTrip.value.model,
            consumption: TempTrip.value.consumption,
            fuel_type: TempTrip.value.fuel_type,
            pax_number: TempTrip.value.pax_number,
            validation: TempTrip.value.validation
        });

        updateTrip(TempTrip.value);
    } catch (error) {
        console.log(error);
        toast.add({
            severity: "info",
            summary: "Faltan datos o los formatos no son adecuados.",
            detail: Error.message,
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

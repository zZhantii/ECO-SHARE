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
                        <InputText v-model="vehicle.brand" type="text" class="d-flex w-100" id="brand" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname1 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname1">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="model">Model</label>
                        <InputText v-model="vehicle.model" type="text" class="d-flex w-100" id="model" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="consumption">Consumption</label>
                        <InputNumber v-model="vehicle.consumption" type="float" class="d-flex w-100" id="consumption"
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
                        <InputNumber v-model="vehicle.pax_number" type="text" class="d-flex w-100" id="pax_number"
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
                        <InputNumber v-model="vehicle.validation" class="d-flex w-100" id="validation" :min="0" :max="1"
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
                        <SelectButton v-model="vehicle.fuel_type" :options="options" aria-labelledby="basic"
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

const { updateVehicle, getVehicle, vehicle } = useVehicles();



onMounted(() => {
    getVehicle(route.params.id)

})

const tempVehicle = ref({});
const options = ["Gasolina", "Diésel"];

const vehicleSchema = yup.object().shape({
    plate: yup.string().matches(/^[A-Z0-9-]+$/, "Formato de matrícula inválido").required("La matrícula es obligatoria"),
    brand: yup.string().required("La marca es obligatoria"),
    model: yup.string().required("El modelo es obligatorio"),
    consumption: yup.number().positive("El consumo debe ser un número positivo").required("El consumo es obligatorio"),
    pax_number: yup.number().integer("Debe ser un número entero").positive("Debe ser un número positivo").required("El número de pasajeros es obligatorio"),
    validation: yup.number().required("La validación es obligatoria"),
    fuel_type: yup.string().oneOf(["Gasolina", "Diésel"], "Tipo de combustible inválido").required("El tipo de combustible es obligatorio"),
});

const submitUpdateVehicle = async () => {
    try {
        tempVehicle.value = {...vehicle.value};
        console.log(tempVehicle.value);
        await vehicleSchema.validate({
            plate: tempVehicle.value.plate,
            brand: tempVehicle.value.brand,
            model: tempVehicle.value.model,
            consumption: tempVehicle.value.consumption,
            fuel_type: tempVehicle.value.fuel_type,
            pax_number: tempVehicle.value.pax_number,
            validation: tempVehicle.value.validation
        });

        updateVehicle(tempVehicle.value);
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

<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Crear Vehiculo</h6>

                    <Select v-model="tempVehicle.user_id" :options="users.data" filter optionLabel="name"
                        optionValue="id" dataKey="id" placeholder="Select a Country" class="w-full md:w-56">
                    </Select>

                    <div class="form-group">
                        <label for="user_id">User_id</label>
                        <SelectButton v-model="tempVehicle.user_id" :options="IDs" aria-labelledby="basic"
                            class="d-flex w-100" id="user_id" />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="plate">Plate</label>
                        <InputText v-model="tempVehicle.plate" type="text" class="d-flex w-100 w-100" id="plate" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="brand">Brand</label>
                        <InputText v-model="tempVehicle.brand" type="text" class="d-flex w-100" id="brand" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname1 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname1">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="model">Model</label>
                        <InputText v-model="tempVehicle.model" type="text" class="d-flex w-100" id="model" />
                        <!-- <div class="text-danger mt-1">{{ errors.surname2 }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.surname2">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="consumption">Consumption</label>
                        <InputNumber v-model="tempVehicle.consumption" type="float" class="d-flex w-100"
                            id="consumption" :minFractionDigits="1" :maxFractionDigits="1" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.email }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.email">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="pax_number">Pax_number</label>
                        <InputNumber v-model="tempVehicle.pax_number" type="text" class="d-flex w-100" id="pax_number"
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
                        <InputNumber v-model="tempVehicle.validation" class="d-flex w-100" id="validation" :min="0"
                            :max="1" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.password }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.password">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label for="fuel_type">Fuel_type</label>
                        <SelectButton v-model="tempVehicle.fuel_type" :options="options" aria-labelledby="basic"
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
    <button class="btn btn-primary" @click="submitAddVehicle">Guardar</button>
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
import useUsers from "@/composables/users";
import useVehicles from "@/composables/vehicles";

const { addVehicle2 } = useVehicles();
const { getUsers, users } = useUsers();

const options = ["Gasolina", "Diésel"];
const IDs = ref([]);

const tempVehicle = ref({
    user_id: "",
    plate: "",
    brand: "",
    model: "",
    consumption: null,
    pax_number: null,
    validation: null,
    fuel_type: "",
});

onMounted(async () => {
    getUsers();
});

const vehicleSchema = yup.object().shape({
    plate: yup.string().matches(/^[A-Z0-9-]+$/, "Formato de matrícula inválido").required("La matrícula es obligatoria"),
    brand: yup.string().required("La marca es obligatoria"),
    model: yup.string().required("El modelo es obligatorio"),
    consumption: yup.number().positive("El consumo debe ser un número positivo").required("El consumo es obligatorio"),
    pax_number: yup.number().integer("Debe ser un número entero").positive("Debe ser un número positivo").required("El número de pasajeros es obligatorio"),
    validation: yup.number().required("La validación es obligatoria"),
    fuel_type: yup.string().oneOf(["Gasolina", "Diésel"], "Tipo de combustible inválido").required("El tipo de combustible es obligatorio"),
});

const submitAddVehicle = async () => {
    try {
        await vehicleSchema.validate({
            plate: tempVehicle.value.plate,
            brand: tempVehicle.value.brand,
            model: tempVehicle.value.model,
            consumption: tempVehicle.value.consumption,
            fuel_type: tempVehicle.value.fuel_type,
            pax_number: tempVehicle.value.pax_number,
            validation: tempVehicle.value.validation
        });

        addVehicle2(tempVehicle.value);
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

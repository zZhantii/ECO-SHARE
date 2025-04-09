<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-2 text-primary">Crear Vehiculo</h4>



                    <div class="form-group my-4">
                        <label for="user_id">User_id</label>
                        <Select v-model="vehicle.user_id" :options="users.data" filter optionLabel="name"
                            optionValue="id" dataKey="id" placeholder="Select a Country" class="w-full md:w-56">
                        </Select>
                        <div v-if="validationErrors.user_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="plate">Plate</label>
                        <InputText v-model="vehicle.plate" type="text" class="d-flex w-100 w-100" id="plate" />
                        <div v-if="validationErrors.plate" class="text-danger mt-1">
                            <div v-for="message in validationErrors.plate" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="brand">Brand</label>
                        <InputText v-model="vehicle.brand" type="text" class="d-flex w-100" id="brand" />
                        <div v-if="validationErrors.brand" class="text-danger mt-1">
                            <div v-for="message in validationErrors.brand" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="model">Model</label>
                        <InputText v-model="vehicle.model" type="text" class="d-flex w-100" id="model" />
                        <div v-if="validationErrors.model" class="text-danger mt-1">
                            <div v-for="message in validationErrors.model" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="consumption">Consumption</label>
                        <InputNumber v-model="vehicle.consumption" type="float" class="d-flex w-100" id="consumption"
                            :minFractionDigits="1" :maxFractionDigits="1" showButtons />
                            <div v-if="validationErrors.consumption" class="text-danger mt-1">
                            <div v-for="message in validationErrors.consumption" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="pax_number">Pax_number</label>
                        <InputNumber v-model="vehicle.pax_number" type="text" class="d-flex w-100" id="pax_number"
                            :min="1" showButtons />
                            <div v-if="validationErrors.pax_number" class="text-danger mt-1">
                            <div v-for="message in validationErrors.pax_number" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="validation">Validation</label>
                        <SelectButton v-model="vehicle.validation" :options="options2" aria-labelledby="basic"
                            class="d-flex w-100" id="Validation" />
                            <div v-if="validationErrors.validation" class="text-danger mt-1">
                            <div v-for="message in validationErrors.validation" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label for="fuel_type">Fuel_type</label>
                        <SelectButton v-model="vehicle.fuel_type" :options="options" aria-labelledby="basic"
                            class="d-flex w-100" id="fuel_type" />
                            <div v-if="validationErrors.fuel_type" class="text-danger mt-1">
                            <div v-for="message in validationErrors.fuel_type" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary" @click="submitAddVehicle">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <Toast />
</template>
<script setup>
// VUE
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Composables
import useUsers from "@/composables/users";
import useVehicles from "@/composables/vehicles";

const { createVehicle, vehicleSchema, validationErrors, vehicle } = useVehicles();
const { getUsers, users } = useUsers();

const options = ["Gasolina", "Diésel"];
const options2 = [0,1];

onMounted(async () => {
    getUsers();
});

const submitAddVehicle = async () => {
    try {
        await vehicleSchema.validate(vehicle.value, { abortEarly: false })
            .then(() => {
                createVehicle(vehicle);
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

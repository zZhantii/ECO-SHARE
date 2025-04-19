<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 border-round">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Crear Vehículo</h2>
                        <span class="text-600 font-medium">Por favor, complete los datos del vehículo</span>
                    </div>

                    <div class="grid">
                        <div class="col-12 md:col-6 mb-4">
                            <label for="user_id" class="block text-900 font-medium mb-2">Usuario</label>
                            <Select v-model="vehicle.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" placeholder="Seleccionar Usuario" class="w-full"
                                :class="{ 'p-invalid': validationErrors.user_id }">
                            </Select>
                            <small v-if="validationErrors.user_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="plate" class="block text-900 font-medium mb-2">Matrícula</label>
                            <InputText v-model="vehicle.plate" id="plate" type="text" class="w-full"
                                :class="{ 'p-invalid': validationErrors.plate }" placeholder="Ingrese la matrícula" />
                            <small v-if="validationErrors.plate" class="p-error block mt-1">
                                <div v-for="message in validationErrors.plate" :key="message">{{ message }}</div>
                            </small>
                        </div>
                        
                        <div class="col-12 md:col-6 mb-4">
                            <label for="brand" class="block text-900 font-medium mb-2">Marca</label>
                            <InputText v-model="vehicle.brand" id="brand" type="text" class="w-full"
                                :class="{ 'p-invalid': validationErrors.brand }" placeholder="Ingrese la marca" />
                            <small v-if="validationErrors.brand" class="p-error block mt-1">
                                <div v-for="message in validationErrors.brand" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="model" class="block text-900 font-medium mb-2">Modelo</label>
                            <InputText v-model="vehicle.model" id="model" type="text" class="w-full"
                                :class="{ 'p-invalid': validationErrors.model }" placeholder="Ingrese el modelo" />
                            <small v-if="validationErrors.model" class="p-error block mt-1">
                                <div v-for="message in validationErrors.model" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="consumption" class="block text-900 font-medium mb-2">Consumo</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="vehicle.consumption" id="consumption" :minFractionDigits="1"
                                    :maxFractionDigits="1" placeholder="0.0" showButtons class="w-full"
                                    :class="{ 'p-invalid': validationErrors.consumption }" />
                            </div>
                            <small v-if="validationErrors.consumption" class="p-error block mt-1">
                                <div v-for="message in validationErrors.consumption" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="pax_number" class="block text-900 font-medium mb-2">Número de Pasajeros</label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="vehicle.pax_number" id="pax_number" :min="1" placeholder="0"
                                    showButtons class="w-full" :class="{ 'p-invalid': validationErrors.pax_number }" />
                            </div>
                            <small v-if="validationErrors.pax_number" class="p-error block mt-1">
                                <div v-for="message in validationErrors.pax_number" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="fuel_type" class="block text-900 font-medium mb-2">Tipo de Combustible</label>
                            <SelectButton v-model="vehicle.fuel_type" :options="options" class="w-full"
                                :class="{ 'p-invalid': validationErrors.fuel_type }" />
                            <small v-if="validationErrors.fuel_type" class="p-error block mt-1">
                                <div v-for="message in validationErrors.fuel_type" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="validation" class="block text-900 font-medium mb-2">Estado de Validación</label>
                            <SelectButton v-model="vehicle.validation" :options="validationOptions" class="w-full"
                                optionLabel="label" optionValue="value"
                                :class="{ 'p-invalid': validationErrors.validation }" />
                            <small v-if="validationErrors.validation" class="p-error block mt-1">
                                <div v-for="message in validationErrors.validation" :key="message">{{ message }}</div>
                            </small>
                        </div>
                    </div>

                    <div class="flex justify-content-end">
                        <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                        <Button label="Guardar" icon="pi pi-check" :loading="loading" @click="submitAddVehicle" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
// VUE
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Composables
import useUsers from "@/composables/users";
import useVehicles from "@/composables/vehicles";

const { createVehicle, vehicleSchema, validationErrors, vehicle } = useVehicles();
const { getUsers, users } = useUsers();

const options = ["Gasolina", "Diésel"];
const validationOptions = [
    { label: 'No Validado', value: 0 },
    { label: 'Validado', value: 1 }
];

onMounted(async () => {
    getUsers();
});

const submitAddVehicle = async () => {
    try {
        await vehicleSchema.validate(vehicle.value, { abortEarly: false })
            .then(() => {
                createVehicle(vehicle);
            });
        router.back();
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

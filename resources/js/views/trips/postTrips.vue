<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card flex justify-center my-4 p-4">
                <Stepper value="1">
                    <StepList class="StepList">
                        <Step value="1">Opciones de viajes</Step>
                        <Step value="2">Detalles del vehiculo</Step>
                        <Step value="3">Resumen del viaje</Step>
                    </StepList>
                    <StepPanels>
                        <StepPanel v-slot="{ activateCallback }" value="1">
                            <div class="flex-auto d-flex justify-content-center">
                                <Toast />
                                <form @submit.prevent="saveOption" class="w-100">
                                    <div class="row d-flex align-items-center">
                                        <!-- Mapa -->
                                        <div class="col-12 col-md-6 d-flex justify-content-center">
                                            <div class="mapTrip border-1 w-100"></div>
                                        </div>
                                        <!-- Inputs -->
                                        <div class="col-12 col-md-6 d-flex flex-column">
                                            <div class="text-center">
                                                <h3 class="mt-2 mb-3 fs-5">¿Desde dónde sales?</h3>
                                                <InputText v-model="tripData.start_point" type="text" class="form-control" placeholder="Punto de inicio" />
                                            </div>
                                            <div class="text-center mt-3">
                                                <h3 class="mt-2 mb-3 fs-5">¿A dónde vas?</h3>
                                                <InputText v-model="tripData.end_point" type="text" class="form-control" placeholder="Destino" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex pt-4 justify-content-end">
                                        <Button label="Next" type="submit" class="primary-a" icon="pi pi-arrow-right" :disabled="!isStep1Complete" iconPos="right" @click="activateCallback('2')" />
                                    </div>
                                </form>
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="2">
                            <div class="flex-auto d-flex justify-content-center">
                                <Toast />
                                <form @submit.prevent="saveOptionCar" class="w-100">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-12 col-md-6 d-flex justify-content-center">
                                            <h3 class="mt-3 mb-5">¿Que Vehiculo utilizarás?</h3>
                                            <div class="d-flex align-items-center">
                                                <FloatLabel class="" variant="on">
                                                    <Select v-model="tripData.vehicle_id" inputId="on_label" :options="vehicles" optionValue="id" optionLabel="brand" class="w-full" />
                                                    <label for="on_label">Selecciones su vehiculo</label>
                                                </FloatLabel>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 d-flex justify-content-center">
                                            <h3 class="mt-3 mb-5">¿Cuantos asientos hay disponibles?</h3>
                                            <div class="d-flex align-items-center">
                                                <InputNumber v-model="tripData.available_seats" inputId="minmax-buttons" mode="decimal" showButtons :min="1" :max="6" fluid />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between pt-6">
                                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                                        <Button label="Next" type="submit" class="primary-a" icon="pi pi-arrow-right" :disabled="!isStep2Complete" iconPos="right" @click="activateCallback('3')" />
                                    </div>
                                </form>
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="3">
                            <div class="flex-auto d-flex justify-content-center">
                                <div class="row d-flex align-items-center w-100">
                                    <!-- Mapa -->
                                    <div class="col-12 col-md-6 d-flex justify-content-center">
                                        <div class="mapTrip border-1 w-100"></div>
                                    </div>
                                    <div class="col-12 col-md-6 d-flex flex-column">
                                        <h2 class="font-bold">¡Resumen del viaje!</h2>
                                        <div class="col d-flex justify-content-between gap-5">
                                            <div>
                                                <h4 class="mb-3">Detalles del vehiculo</h4>
                                                <ul class="d-flex flex-column gap-3">
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.brand ? `Marca: ${selectedVehicleDetails.brand}` : 'Marca no disponible' }}</li>
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.model ? `Modelo: ${selectedVehicleDetails.model}` : 'Modelo no disponible' }}</li>
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.plate ? `Matrícula: ${selectedVehicleDetails.plate}` : 'Matrícula no disponible' }}</li>
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.consumption ? `Consumo: ${selectedVehicleDetails.consumption}` : 'Consumo no disponible' }}</li>
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.pax_number ? `Número de asientos: ${selectedVehicleDetails.pax_number}` : 'Número de asientos no disponible' }}</li>
                                                    <li v-if="selectedVehicleDetails">{{ selectedVehicleDetails.fuel_type ? `Tipo de gasolina: ${selectedVehicleDetails.fuel_type}` : 'Tipo de gasolina no disponible' }}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 class="mb-3">Detalles del viaje</h4>
                                                <ul class="d-flex flex-column gap-3">
                                                    <li>Origen: {{ tripData.start_point }}</li>
                                                    <li>Destino: {{ tripData.end_point }}</li>
                                                    <li>Fecha de inicio: {{ }}</li>
                                                    <li>Horas de viaje: {{ }}</li>
                                                    <li>Distancia: {{ }}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between pt-6">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                                <Button label="Confirmar Viaje" @click="postTrips" class="primary-a" icon="pi pi-arrow-right" iconPos="right" />
                            </div>
                        </StepPanel>
                    </StepPanels>
                </Stepper>
            </div>
        </div>
    </div>
</template>



<script setup>
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

// Form
import * as yup from "yup";
import { es, tr } from "yup-locales";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";
import { onMounted, ref, watch, computed } from 'vue';
import { start } from '@popperjs/core';
import { authStore } from "../../store/auth";

// DataBase
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const Show = true;

const toast = useToast();

let user_id = ref(0);
user_id.value = authStore().user.id;
console.log("userId", user_id.value);

onMounted(async () => {
    const savedTrip = sessionStorage.getItem("tripData");
    if (savedTrip) {
        tripData.value = JSON.parse(savedTrip);
    }

    try {
        const responseVehicles = await axios.get('/api/vehicle');
        vehicles.value = responseVehicles.data.data;
    } catch (error) {
        console.error('Error al cargar vehículos:', error);
    }
});

const tripData = ref({
    user_id: user_id.value,
    start_point: "",
    end_point: "",
    vehicle_id: null,
    available_seats: null,
    price: 50.00,
});


const selectedVehicleDetails = ref(null);

watch(() => tripData.value.vehicle_id, async (id) => {
    if (id) {
        router.push({ query: { vehicle: id } });
        await findVehicleById(id);
    } else {
        selectedVehicleDetails.value = null;
    }
});


const nextStep = (step, condition, activateCallback) => {
    if (condition) {
        activateCallback(step);
    }
};

// Computed para validar el paso 1
const isStep1Complete = computed(() => {
    return tripData.value.start_point.trim() !== "" && tripData.value.end_point.trim() !== "";
});

// Computed para validar el paso 2
const isStep2Complete = computed(() => {
    return tripData.value.vehicle_id !== null && tripData.value.vehicle_id > 0
        && tripData.value.available_seats !== null && tripData.value.available_seats > 0;
});

const findVehicleById = async (id) => {
    try {
        const response = await axios.get(`/api/vehicle/${id}`);
        selectedVehicleDetails.value = response.data;
    } catch (error) {
        console.error("Error al obtener los detalles del vehículo:", error);
        selectedVehicleDetails.value = null;
    }
};

const saveTripData = () => {
    sessionStorage.setItem("tripData", JSON.stringify(tripData.value));
};

const pointSchema = yup.object().shape({
    start_point: yup.string().required('El punto de inicio es obligatorio'),
    end_point: yup.string().required('El destino es obligatorio'),
});

const saveOption = async () => {
    try {
        await pointSchema.validate({ start_point: tripData.value.start_point, end_point: tripData.value.end_point });
        saveTripData();
        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Origen: ${tripData.value.start_point} | Destino: ${tripData.value.end_point}`,
            life: 3000,
        });
    } catch (error) {

        toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
};

const vehicles = ref([]);
const CarSchema = yup.object().shape({
    vehicle_id: yup.number().required('El vehículo es obligatorio').min(1, 'Debe seleccionar un vehículo válido'),
    available_seats: yup.number().required('Debe indicar los asientos disponibles').min(1, 'Debe haber al menos un asiento disponible'),
});

const saveOptionCar = async () => {
    try {
        await CarSchema.validate({ vehicle_id: tripData.value.vehicle_id, available_seats: tripData.value.available_seats });

        saveTripData();
        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Vehículo: ${tripData.value.vehicle_id} | Asientos: ${tripData.value.available_seats}`,
            life: 3000,
        });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
};

const postTrips = async () => {
    tripData.value.user_id = user_id.value;

    try {
        console.log("Enviando datos del viaje: ", tripData.value);
        const response = await axios.post('/api/trip', tripData.value);
        toast.add({ severity: 'success', summary: '¡Viaje registrado!', detail: 'El viaje ha sido guardado exitosamente.', life: 3000 });
        sessionStorage.removeItem("tripData");
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el viaje.', life: 3000 });
    }
};

</script>

<style scoped>
i {
    font-size: 35px;
    padding-right: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mapTrip {
    max-width: 500px;
    height: 250px;
}

.col-12 {
    width: 100% !important;
}

@media (min-width: 450px) {
    .col-md-6 {
        width: 50% !important;
        flex-direction: column;
        align-items: center;
    }
}

@media (max-width: 450px) {
    .StepList {
        display: flex;
        justify-content: center;
        text-align: center;
    }
}
</style>
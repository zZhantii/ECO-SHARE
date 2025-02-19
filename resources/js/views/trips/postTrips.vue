<template>
    <div class="container">
        <div class="card flex justify-center my-4">
            <Stepper value="1" class="basis-[50rem]">
                <StepList>
                    <Step value="1">Opciones de viajes</Step>
                    <Step value="2">Detalles del vehiculo</Step>
                    <Step value="3">Resumen</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col container-panel">
                            <div class="bg-surface-50 dark:bg-surface-950 flex-auto d-flex justify-content-center">
                                <Toast />
                                <form @submit.prevent="saveOption" class="w-100 d-flex flex-column align-items-center gap-5 my-5">
                                    <div class="container d-flex justify-content-around">
                                        <div class="row">
                                            <div class="row mapTrip d-flex justify-content-center border-1"></div>
                                        </div>
                                        <div class="row flex-column align-items-center">
                                            <div class="col d-flex flex-column align-items-center">
                                                <h3 class="mt-3 mb-5">¿Desde dónde sales?</h3>
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="tripData.start_point" type="text" class="form-control" placeholder="Punto de inicio">
                                                </div>
                                            </div>
                                            <div class="col d-flex flex-column align-items-center">
                                                <h3 class="mt-3 mb-5">¿A dónde vas?</h3>
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="tripData.end_point" type="text" class="form-control" placeholder="Destino">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" value="Guardar" class="btn-primary">
                                </form>
                            </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" :disabled="!next" iconPos="right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">

                        <Toast />
                        <form @submit.prevent="saveOptionCar" class="w-100 d-flex flex-column align-items-center gap-5 my-5">
                            <div class="container d-flex justify-content-around">
                                <div class="row">
                                    <div class="col d-flex flex-column align-items-center">
                                        <h3 class="mt-3 mb-5">¿Que Vehiculo utilizarás?</h3>
                                        <div class="d-flex align-items-center">
                                            <FloatLabel class="" variant="on">
                                                <Select v-model="tripData.vehicle_selected" inputId="on_label" :options="vehicles" optionValue="id" optionLabel="brand" class="w-full" />
                                                <label for="on_label">Selecciones su vehiculo</label>
                                            </FloatLabel>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col d-flex flex-column align-items-center">
                                        <h3 class="mt-3 mb-5">¿Cuantos asientos hay disponibles?</h3>
                                        <div class="d-flex align-items-center">
                                            <InputNumber v-model="tripData.available_seats" inputId="minmax-buttons" mode="decimal" showButtons :min="1" :max="6" fluid />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Guardar" class="btn-primary">
                        </form>

                        <div class="d-flex justify-content-between pt-6">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" :disabled="next" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="d-flex flex-column align-items-center container-panel">
                            <div class="bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium w-100">
                                <div class="container d-flex justify-content-around">
                                    <div class="row mapTrip d-flex justify-content-center border-1"></div>
                                    <div class="row flex-column">
                                        <div class="col">
                                            <h2 class="font-bold">¡Resumen del viaje!</h2>
                                        </div>
                                        <div class="col d-flex justify-content-between">
                                            <div>
                                                <h4 class="mb-3">Detalles del vehiculo</h4>
                                                <ul class="d-flex flex-column gap-3">
                                                    <li>Marca: {{ selectedVehicleDetails.brand }}</li>
                                                    <li>Modelo: {{ selectedVehicleDetails.model }}</li>
                                                    <li>Matrícula: {{ selectedVehicleDetails.plate }}</li>
                                                    <li>Consumo: {{ selectedVehicleDetails.consumption }}</li>
                                                    <li>Número de asientos: {{ selectedVehicleDetails.pax_number }}</li>
                                                    <li>Tipo de gasolina: {{ selectedVehicleDetails.fuel_type }}</li>
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
                                        <div class="col">

                                        </div>
                                    </div>
                                    <div class="row">

                                    </div>
                                </div>
                            </div>
                            <button type="submit" @click="postTrips" class="btn-primary mt-4">Confirmar Viaje</button>
                        </div>
                        <div class="pt-6">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
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
import { onMounted, ref, watch } from 'vue';
import { start } from '@popperjs/core';

// DataBase
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();


const toast = useToast();

const tripData = ref({
    start_point: "",
    end_point: "",
    vehicle_selected: 0,
    available_seats: 1,
});

const next = ref(false);

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

const selectedVehicleDetails = ref(null);

watch(() => tripData.value.vehicle_selected, async (id) => {
    if (id) {
        router.push({ query: { vehicle: id } });
        await findVehicleById(id);
    } else {
        selectedVehicleDetails.value = null;
    }
});

watch(() => [
    tripData.value.start_point,
    tripData.value.end_point,
    tripData.value.vehicle_selected,
    tripData.value.available_seats
], () => {
    next.value = false;
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
        next.value = true;
        saveTripData();
        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Origen: ${tripData.value.start_point} | Destino: ${tripData.value.end_point}`,
            life: 3000,
        });
    } catch (error) {
        next.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
};

const vehicles = ref([]);
const CarSchema = yup.object().shape({
    vehicle_selected: yup.number().required('El vehículo es obligatorio').min(1, 'Debe seleccionar un vehículo válido'),
    available_seats: yup.number().required('Debe indicar los asientos disponibles').min(1, 'Debe haber al menos un asiento disponible'),
});

const saveOptionCar = async () => {
    try {
        await CarSchema.validate({ vehicle_selected: tripData.value.vehicle_selected, available_seats: tripData.value.available_seats });
        next.value = false;
        saveTripData();
        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Vehículo: ${tripData.value.vehicle_selected} | Asientos: ${tripData.value.available_seats}`,
            life: 3000,
        });
    } catch (error) {
        next.value = true;
        toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
};

const postTrips = async () => {
    try {
        console.log("Enviando datos del viaje: ", tripData.value);
        const response = await axios.post('/api/trip', tripData.value);
        toast.add({ severity: 'success', summary: '¡Viaje registrado!', detail: 'El viaje ha sido guardado exitosamente.', life: 3000 });
        sessionStorage.removeItem("tripData");
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el viaje.', life: 3000 });
    }
};

</script>

<style scoped>
.container-panel {
    height: fit-content;
}

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
    height: 400px;
    width: 600px;
}
</style>

<template>
    <div class="container">
        <div class="card flex justify-center my-4">
            <Stepper value="1" class="basis-[50rem]">
                <StepList>
                    <Step value="1">Opciones de viajes</Step>
                    <Step value="2">Detalles del vehiculo</Step>
                    <Step value="3">Header III</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col container-panel">
                            <div class="bg-surface-50 dark:bg-surface-950 flex-auto d-flex justify-content-center">
                                <Toast />
                                <form @submit.prevent="saveOption" class="w-100 d-flex flex-column align-items-center gap-5 my-5">
                                    <div class="container d-flex justify-content-around">
                                        <div class="row">
                                            <div class="col d-flex flex-column align-items-center">
                                                <h3 class="mt-3 mb-5">¿Desde dónde sales?</h3>
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="startPoint" type="text" class="form-control" placeholder="Punto de inicio">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col d-flex flex-column align-items-center">
                                                <h3 class="mt-3 mb-5">¿A dónde vas?</h3>
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="endPoint" type="text" class="form-control" placeholder="Destino">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" value="Guardar" class="btn-primary">
                                </form>
                            </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
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
                                                <Select v-model="vehicleSelected" inputId="on_label" :options="vehicles" optionLabel="brand" class="w-full" />
                                                <label for="on_label">Selecciones su vehiculo</label>
                                            </FloatLabel>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col d-flex flex-column align-items-center">
                                        <h3 class="mt-3 mb-5">¿A dónde vas?</h3>
                                        <div class="d-flex align-items-center">
                                            <i class='pi pi-map map'></i>
                                            <input v-model="endPoint" type="text" class="form-control" placeholder="Destino">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Guardar" class="btn-primary">
                        </form>

                        <div class="d-flex justify-content-between pt-6">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col container-panel">
                            <div class="bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
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
import { es } from "yup-locales";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";
import { onMounted, ref, watch } from 'vue';
import { start } from '@popperjs/core';

// DataBase
import axios from 'axios';

const vehicles = ref([]);
const vehicleSelected = ref(null);

onMounted(async () => {
    try {
        startPoint.value = sessionStorage.getItem("trip_start") || "";
        endPoint.value = sessionStorage.getItem("trip_end") || "";
        // const response = await axios.post('/api/trip');
        // console.log('Trip Subido correctamente a la base de datos')


        // Api con vehicles
        const responseVehicles = await axios.get('/api/vehicle');
        console.log('Respuesta completa de la API:', responseVehicles.data);
        vehicles.value = responseVehicles.data.data;
        console.log('Vehicles cargados:', vehicles.value);

    } catch (error) {
        console.error('Error al subir los trips:', error);
    }
})

yup.setLocale(es);
const toast = useToast();

const startPoint = ref("");
const endPoint = ref("");

const PointsSchema = yup.object().shape({
    start_point: yup.string().required('El punto de inicio es obligatorio'),
    end_point: yup.string().required('El destino es obligatorio'),
});

// Guardar las opciones del viaje
const saveOption = async () => {
    try {
        await PointsSchema.validate({ start_point: startPoint.value, end_point: endPoint.value });

        sessionStorage.setItem("trip_start", startPoint.value);
        sessionStorage.setItem("trip_end", endPoint.value);

        const savedStart = sessionStorage.getItem("trip_start");
        const savedEnd = sessionStorage.getItem("trip_end");

        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Punto de inicio: ${savedStart} | Destino: ${savedEnd}`,
            life: 3000,
        });

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
        });
    }
}

const a = ref("");
const e = ref("");

const CarSchema = yup.object().shape({
    start_point: yup.string().required('El punto de inicio es obligatorio'),
    end_point: yup.string().required('El destino es obligatorio'),
});

// Guardar las opciones del Vehiculo
const saveOptionCar = async () => {
    try {
        await CarSchema.validate({ start_point: startPoint.value, end_point: endPoint.value });

        sessionStorage.setItem("trip_start", startPoint.value);
        sessionStorage.setItem("trip_end", endPoint.value);

        const savedStart = sessionStorage.getItem("trip_start");
        const savedEnd = sessionStorage.getItem("trip_end");

        toast.add({
            severity: 'success',
            summary: 'Guardado con éxito',
            detail: `Punto de inicio: ${savedStart} | Destino: ${savedEnd}`,
            life: 3000,
        });

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
        });
    }
}

// Publicar el Viaje
// const postTrips = async () => {
//     try {
//         toast.add({
//             severity: 'success',
//             summary: '¡Guardado!',
//             detail: `Se ha guardado correctamente el ${formName === 'start_point' ? 'punto de inicio' : 'destino'}`,
//             life: 3000,
//         });
//     } catch (error) {
//         toast.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: error.message,
//             life: 3000,
//         });
//     }
// };

</script>

<style scoped>
.container-panel {
    height: fit-content;
}

i {
    font-size: 35px;
    padding-right: 10px;
}
</style>

<template>
    <div class="container">
        <TripFinder class="my-5" />
    </div>

    <div class="container d-flex justify-content-between my-5">
        <div class="row w-aside flex-column">
            <div class="col flex-none">
                <div class="d-flex justify-content-between">
                    <h4>Ordenar Por</h4>
                    <p>Borrar Todo</p>
                </div>
            </div>
            <div class="col">
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Salida más temprano </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Salida más tarde </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Punt de recogida </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.58,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.35,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z"></path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Punt de destino </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.58,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.35,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z"></path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Precio más bajo </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                    <label for="ingredient1" class="w-75"> Precio más alto </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="row w-main p-4 flex-column">
            <div class="col">
                Fecha, Inicio -> Destino
            </div>
            <div class="col">
                <DataView :value="trips" paginator :rows="5">
                    <template #list="slotProps">
                        <div class="flex flex-col flex-column gap-4">
                            <div class="container-trips" v-for="(trip, index) in slotProps.items" :key="index">
                                <div class="d-flex" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                                    <div>
                                        <img class="block xl:block mx-auto rounded-img" src="../../../../public/images/image.png" alt="Trip Image" height="188px" />
                                    </div>
                                    <div class="d-flex p-3 container-trip">
                                        <div class="d-flex flex-column justify-content-around gap-4">
                                            <div class="d-flex gap-2">
                                                <h4>{{ trip.start_point }}:</h4>
                                                <p>{{ trip.departure_time }}</p>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <h4>{{ trip.end_point }}:</h4>
                                                <p>{{ trip.departure_time }}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column justify-content-around">
                                            <div class="d-flex align-items-center">
                                                <div class="p-2 border-1 rounded me-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                                                        <path d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z"></path>
                                                    </svg>
                                                </div>
                                                <p class="m-0 w-75">: {{ trip.available_seats }}</p>
                                                <span class="text-xl font-semibold">${{ trip.price }}</span>
                                            </div>
                                            <div class="flex flex-row-reverse md:flex-row gap-4 align-items-center">
                                                <Button icon="pi pi-heart" class="btn-primary" outlined></Button>
                                                <Button icon="pi pi-shopping-cart" label="Reservar" class="flex-auto md:flex-initial whitespace-nowrap btn-secondary ms-3"></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
</template>

<script setup>
import TripFinder from "../../components/TripFinder.vue";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import axios from 'axios';
import DataView from 'primevue/dataview';
import { ref, onMounted } from "vue";
import Checkbox from 'primevue/checkbox';

// CheckBox
const pizza = ref();

// APi
const trips = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('/api/trip');
        trips.value = response.data.data;
        console.log('Trips cargados:', trips.value);
    } catch (error) {
        console.error('Error al obtener los trips:', error);
    }
});

const products = ref();
const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return null;
    }
};
</script>


<style scoped>
.w-aside {
    padding: 0;
    width: 27%;

}

.w-main {
    width: 73%;
    background-color: white;
    box-shadow: #00000026 0px 10px 10px 0px;
    border-radius: 10px;
}

.container-trips {
    box-shadow: #00000026 10px 10px 10px 0px;
    border-radius: 10px;
}

label {
    font-weight: 500;
}

.inputFilter {
    border: solid 0px #e0e0e0;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
}

.inputFilter:hover {
    background-color: #ececec;
}

.rounded-img {
    border-radius: 10px 0px 0px 10px;
}

.container-trip {
    gap: 60px;
}
</style>

<template>
    <div class="container">
        <TripFinder class="my-5" />
    </div>

    <div class="card border-0 bg-transparent">
        <Splitter class="splitter">
            <SplitterPanel class="d-flex flex-column" :size="27">
                <h4>Ordenar Por</h4>
                <div class="card flex flex-wrap justify-center gap-4 border-0 p-3">
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Salida más temprano </label>
                        <p>reloj</p>
                    </div>
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Salida más tarde </label>
                        <p>reloj</p>
                    </div>
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Punt de recogida </label>
                        <p>reloj</p>
                    </div>
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Punt de destino </label>
                        <p>reloj</p>
                    </div>
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Precio más bajo </label>
                        <p>reloj</p>
                    </div>
                    <div class="flex align-items-center gap-2 justify-content-between">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="w-75"> Precio más alto </label>
                        <p>reloj</p>
                    </div>
                </div>
            </SplitterPanel>
            <SplitterPanel class="d-flex justify-content-center" :size="73">
                <div class="card w-100 ms-2 border-0">
                    <DataView :value="trips" paginator :rows="5">
                        <template #list="slotProps">
                            <div class="flex flex-col flex-column gap-4">
                                <div class="w-100 border-1 rounded" v-for="(trip, index) in slotProps.items" :key="index">
                                    <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                                        <div class="md:w-50 ms-margin me-5 relative">
                                            <img class="block xl:block mx-auto rounded" src="../../../../public/images/image.png" alt="Trip Image" height="188px" />
                                            <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                                <Tag :value="trip.available_seats" :severity="getSeverity(trip)"></Tag>
                                            </div>
                                        </div>
                                        <div class="flex flex-col md:flex-row justify-around flex-1 gap-6 ">
                                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                                <div>
                                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">Trip</span>
                                                    <div class="text-lg font-medium mt-2">{{ trip.start_point }} => {{ trip.end_point }}</div>
                                                </div>
                                            </div>
                                            <div class="flex flex-col md:items-end gap-8 ">
                                                <span class="text-xl font-semibold">${{ trip.price }}</span>
                                                <div class="flex flex-row-reverse md:flex-row gap-2 align-items-center">
                                                    <Button icon="pi pi-heart" class="btn-primary" outlined></Button>
                                                    <Button icon="pi pi-shopping-cart" label="Reservar" class="flex-auto md:flex-initial whitespace-nowrap btn-secondary"></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </DataView>
                </div>
            </SplitterPanel>
        </Splitter>
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
.splitter {
    padding: 10px;
    height: 100%;
    margin-left: 7%;
    margin-right: 7%;
}
</style>

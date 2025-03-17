<template>
    <div class="container">
        <TripFinder class="my-5" @mapsInfo="handleUpdateMapsInfo" />
    </div>

    <div class="container container-responsive d-flex justify-content-between my-5">
        <div class="row w-aside ">
            <div class="col-12 col-md-4">
                <div class="d-flex justify-content-between">
                    <h4>Ordenar Por</h4>
                    <p>Borrar Todo</p>
                </div>
                <!-- <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.earlyDeparture" inputId="earlyDeparture" binary />
                    <label for="earlyDeparture" class="w-75 cursor-pointer">Salida más temprano</label>

                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256"
                        aria-label="Icono de filtro">
                        <path
                            d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox type="checkbox" v-model="filters.lateDeparture" />
                    <label for="lateDeparture" class="w-75">Salida más tarde</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox type="checkbox" v-model="filters.pickupPoint" />
                    <label for="pickupPoint" class="w-75"> Punt de recogida </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M152,86a30,30,0,1,0-30-30A30,30,0,0,0,152,86Zm0-48a18,18,0,1,1-18,18A18,18,0,0,1,152,38Zm66.49,100.86c-.59.27-7.17,3.13-18.88,3.13-13.86,0-34.9-4-61.73-21a165.89,165.89,0,0,1-17.43,36.51c9.43,2.78,22,7.72,33.19,16.26C172.46,188.05,182,207.65,182,232a6,6,0,0,1-12,0c0-44-37.23-59.18-56.91-64.11q-1.2,1.55-2.46,3.09c-19.25,23.31-43.34,35.45-70.11,35.45A90.72,90.72,0,0,1,31.4,206A6,6,0,0,1,32.6,194c26.63,2.66,49.77-7.66,68.77-30.69,13.16-15.94,21.94-35.51,26.08-49.15-40.51-24.52-66.59-4.78-67.72-3.89a6,6,0,0,1-7.48-9.38c.37-.3,9.39-7.43,24.76-10,13.86-2.31,35.92-1.3,62.36,16.67,47.14,32,73.88,20.47,74.14,20.35a6,6,0,1,1,5,10.92Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox type="checkbox" v-model="filters.destinationPoint" />
                    <label for="destinationPoint" class="w-75"> Punt de destino </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M152,86a30,30,0,1,0-30-30A30,30,0,0,0,152,86Zm0-48a18,18,0,1,1-18,18A18,18,0,0,1,152,38Zm66.49,100.86c-.59.27-7.17,3.13-18.88,3.13-13.86,0-34.9-4-61.73-21a165.89,165.89,0,0,1-17.43,36.51c9.43,2.78,22,7.72,33.19,16.26C172.46,188.05,182,207.65,182,232a6,6,0,0,1-12,0c0-44-37.23-59.18-56.91-64.11q-1.2,1.55-2.46,3.09c-19.25,23.31-43.34,35.45-70.11,35.45A90.72,90.72,0,0,1,31.4,206A6,6,0,0,1,32.6,194c26.63,2.66,49.77-7.66,68.77-30.69,13.16-15.94,21.94-35.51,26.08-49.15-40.51-24.52-66.59-4.78-67.72-3.89a6,6,0,0,1-7.48-9.38c.37-.3,9.39-7.43,24.76-10,13.86-2.31,35.92-1.3,62.36,16.67,47.14,32,73.88,20.47,74.14,20.35a6,6,0,1,1,5,10.92Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox type="checkbox" v-model="filters.lowestPrice" @change="filters.highestPrice = false" />
                    <label for="lowestPrice" class="w-75"> Precio más bajo </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M224.56,103.81C213.43,97.75,198.47,93.39,182,91.34V84c0-12.12-9.58-23.1-27-30.93C139.16,45.93,118.2,42,96,42S52.84,45.93,37,53.07C19.58,60.9,10,71.88,10,84v40c0,12.12,9.58,23.1,27,30.93,10.49,4.72,23.21,8,37,9.73V172c0,12.12,9.58,23.1,27,30.93C116.84,210.07,137.8,214,160,214s43.16-3.93,59-11.07c17.39-7.83,27-18.81,27-30.93V132C246,121.35,238.39,111.34,224.56,103.81Zm-5.74,10.54C228.61,119.68,234,126,234,132c0,14.19-30.39,30-74,30a166.9,166.9,0,0,1-21.21-1.34A110.79,110.79,0,0,0,155,154.93c17.39-7.83,27-18.81,27-30.93V103.43C196.4,105.36,209.3,109.16,218.82,114.35ZM108.16,153.58c-3.92.27-8,.42-12.16.42-5.3,0-10.4-.24-15.28-.67a2.22,2.22,0,0,0-.37,0c-3.58-.33-7-.77-10.35-1.3V124.12A178,178,0,0,0,96,126a178,178,0,0,0,26-1.88V152c-4.34.69-8.91,1.22-13.69,1.56ZM170,105.89V124c0,9.54-13.75,19.8-36,25.51V121.85a115,115,0,0,0,21-6.92A66.2,66.2,0,0,0,170,105.89ZM96,54c43.61,0,74,15.81,74,30s-30.39,30-74,30S22,98.19,22,84,52.39,54,96,54ZM22,124V105.89a66.2,66.2,0,0,0,15,9,115,115,0,0,0,21,6.92v27.66C35.75,143.8,22,133.54,22,124Zm64,48v-6.28c3.3.18,6.63.28,10,.28q5.91,0,11.66-.37A123.17,123.17,0,0,0,122,169.84v27.67C99.75,191.8,86,181.54,86,172Zm48,28V172.1a177.84,177.84,0,0,0,26,1.9,178,178,0,0,0,26-1.88V200a170,170,0,0,1-52,0Zm64-2.49V169.85a115,115,0,0,0,21-6.92,66.2,66.2,0,0,0,15-9V172C234,181.54,220.25,191.8,198,197.51Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox type="checkbox" v-model="filters.highestPrice" @change="filters.lowestPrice = false" />
                    <label for="highestPrice" class="w-75"> Precio más alto </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M224.56,103.81C213.43,97.75,198.47,93.39,182,91.34V84c0-12.12-9.58-23.1-27-30.93C139.16,45.93,118.2,42,96,42S52.84,45.93,37,53.07C19.58,60.9,10,71.88,10,84v40c0,12.12,9.58,23.1,27,30.93,10.49,4.72,23.21,8,37,9.73V172c0,12.12,9.58,23.1,27,30.93C116.84,210.07,137.8,214,160,214s43.16-3.93,59-11.07c17.39-7.83,27-18.81,27-30.93V132C246,121.35,238.39,111.34,224.56,103.81Zm-5.74,10.54C228.61,119.68,234,126,234,132c0,14.19-30.39,30-74,30a166.9,166.9,0,0,1-21.21-1.34A110.79,110.79,0,0,0,155,154.93c17.39-7.83,27-18.81,27-30.93V103.43C196.4,105.36,209.3,109.16,218.82,114.35ZM108.16,153.58c-3.92.27-8,.42-12.16.42-5.3,0-10.4-.24-15.28-.67a2.22,2.22,0,0,0-.37,0c-3.58-.33-7-.77-10.35-1.3V124.12A178,178,0,0,0,96,126a178,178,0,0,0,26-1.88V152c-4.34.69-8.91,1.22-13.69,1.56ZM170,105.89V124c0,9.54-13.75,19.8-36,25.51V121.85a115,115,0,0,0,21-6.92A66.2,66.2,0,0,0,170,105.89ZM96,54c43.61,0,74,15.81,74,30s-30.39,30-74,30S22,98.19,22,84,52.39,54,96,54ZM22,124V105.89a66.2,66.2,0,0,0,15,9,115,115,0,0,0,21,6.92v27.66C35.75,143.8,22,133.54,22,124Zm64,48v-6.28c3.3.18,6.63.28,10,.28q5.91,0,11.66-.37A123.17,123.17,0,0,0,122,169.84v27.67C99.75,191.8,86,181.54,86,172Zm48,28V172.1a177.84,177.84,0,0,0,26,1.9,178,178,0,0,0,26-1.88V200a170,170,0,0,1-52,0Zm64-2.49V169.85a115,115,0,0,0,21-6.92,66.2,66.2,0,0,0,15-9V172C234,181.54,220.25,191.8,198,197.51Z">
                        </path>
                    </svg>
                </div>-->
            </div>
        </div>
        <div class="row w-main">
            <div class="col-12">
                Fecha, Inicio -> Destino
            </div>
            <div class="col-12">
                <div v-for="(trip, index) in tripsList" :key="index" class="border p-5 rounded">
                    <div class="d-flex pb-4">
                        <Timeline :value="getTimelineEvents(trip)" layout="horizontal" align="top"
                            class="border-end w-75 pe-5">
                            <template #marker="slotProps">
                                <i class="pi pi-map-marker px-2" style="font-size: 1.5rem"></i>
                                <p class="m-0 px-2">{{ formatTime(slotProps.item.time) }}</p>
                            </template>
                            <template #content="slotProps">
                                <div class="timeline-event">
                                    <p class="m-0">{{ slotProps.item.location }}</p>
                                </div>
                            </template>
                        </Timeline>
                        <div class="d-flex flex-column justify-content-center align-items-center gap-3 w-25">
                            <span class="text-xl font-semibold">${{ trip.price }}</span>
                            <router-link :to="{ name: 'ConfirmationTrips', params: { id: trip.id } }"
                                class="btn-primary">Reserva</router-link>
                        </div>
                    </div>
                    <div class=" d-flex border-top pt-5 px-5 ">
                        <div class="d-flex gap-3 align-items-center pe-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                                viewBox="0 0 256 256">
                                <path
                                    d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                                </path>
                            </svg>
                            <p class="m-0">{{ trip.available_seats }}</p>
                        </div>
                        <div class="border-start ps-5">
                            <p>Tags</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//  Components
import TripFinder from "../../components/TripFinder.vue";

// Composables
import useTrips from "@/composables/trips";
const { getTrips, tripsList } = useTrips();

// Routes
import { useRoute } from "vue-router";
const route = useRoute();

// PrimeVue
import Timeline from "primevue/timeline";

// Vue
import { onMounted, defineEmits } from "vue";

const handleUpdateMapsInfo = async (mapsInfo) => {
    console.log("Enviando parámetros de búsqueda:", {
        origin: mapsInfo.origin,
        destination: mapsInfo.destination,
        date: mapsInfo.date,
        passengers: mapsInfo.passengers
    });

    await getTrips({
        origin: mapsInfo.origin,
        destination: mapsInfo.destination,
        date: mapsInfo.date,
        passengers: mapsInfo.passengers
    });
};


function formatTime(dateTime) {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("es-ES", {
        hour: "numeric",
        minute: "numeric",
    }).format(date);
}

function getTimelineEvents(trip) {
    return [
        {
            location: trip.start_point,
            time: trip.departure_time,
        },
        {
            location: trip.end_point,
            time: trip.arrival_time || trip.departure_time,
        },
    ];
}

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
    padding: 20px;
}

.container-trips {
    border: solid 1px #d0d1d3;
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
    gap: 80px;
}

.container-info {
    display: flex;
    justify-content: space-between;
}

@media (max-width: 458px) {
    .w-aside {
        width: auto;
    }

    .w-main {
        width: auto;
    }

    .container-responsive {
        flex-direction: column;
    }

    .rounded-img {
        border-radius: 10px 10px 0px 0px;
    }

    img {
        width: 100%;
        height: auto;
    }

    .container-info {
        flex-direction: column;
    }

    .container-trip {
        flex-direction: column;
        gap: 30px;
    }

    .price {
        justify-content: space-between;
        margin-bottom: 30px;
    }
}
</style>
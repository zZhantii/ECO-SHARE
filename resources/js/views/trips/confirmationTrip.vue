<template>
    <div class="container d-flex justify-content-between my-4">
        <div class="row row_1 gap-4 flex-column">
            <div class="col border rounded">
                <div class="d-flex">
                    <Timeline :value="getTimelineEvents(tripList)" layout="horizontal" align="top"
                        class="border-end w-75 p-5">
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
                    <div class="d-flex gap-3 align-items-center px-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                            viewBox="0 0 256 256">
                            <path
                                d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                            </path>
                        </svg>
                        <p class="m-0">{{ tripList.available_seats }}</p>
                    </div>
                </div>
                <div class="border-top p-5 mt-2">
                    <p>Labels</p>
                </div>
            </div>
            <div class="col border rounded">
                Mapa
            </div>
        </div>
        <div class="row row_2 border rounded justify-content-center p-5">
            <div>
                <h3>Detalles del Viaje</h3>
                <ul>
                    <li>Fecha: {{ tripList.departure_time }}</li>
                    <li>Origen: {{ tripList.start_point }}</li>
                    <li>Destino: {{ tripList.end_point }}</li>
                    <li>Distancia: {{ tripList.distance }}</li>
                    <li>Duración: {{ tripList.duration }}</li>
                </ul>
            </div>
            <div class="row_separation"></div>
            <div>
                <h3>Conductor</h3>
                <p>{{ user.surname1 }}</p>
                <p>{{ user.surname2 }}</p>
                <p>{{ user.alias }}</p>
                <p>{{ user.email }}</p>
                <p>{{ user.profile_photo }}</p>
            </div>
            <div>
                <h3>Vehículo</h3>
                <p>{{ vehicle.brand }}</p>
                <p>{{ vehicle.model }}</p>
                <p>{{ vehicle.license_plate }}</p>
                <p>{{ vehicle.color }}</p>
                <p>{{ vehicle.photo }}</p>
            </div>
            <div>
                <h3>Coste</h3>
                <p>{{ tripList.price }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// Composables
import useTrips from "@/composables/trips";
import useVehicles from "@/composables/vehicles";
import useUsers from "@/composables/users";

const { getTrip, tripList } = useTrips();
const { getVehicle, vehicle } = useVehicles();
const { getUser, user } = useUsers();

// Routes
import { useRoute } from "vue-router";
const route = useRoute();
const tripId = route.params.id;

// PrimeVue
import Timeline from "primevue/timeline";

// Vue
import { onMounted } from "vue";



onMounted(async () => {
    await getTrip(tripId);
    console.log(tripList.value.vehicle_id);
    await getVehicle(tripList.value.vehicle_id);
    await getUser(tripList.user_id);
});

// Funciones de formateo de Time para el TimeLine
function formatTime(dateTime) {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
        return "Invalid time";
    }
    return new Intl.DateTimeFormat("es-ES", {
        hour: "numeric",
        minute: "numeric",
    }).format(date);
}

function getTimelineEvents(tripList) {

    return [
        {
            location: tripList.start_point,
            time: tripList.departure_time,
        },
        {
            location: tripList.end_point,
            time: tripList.arrival_time || tripList.departure_time,
        },
    ];
}
</script>

<style scoped>
.row_1 {
    width: 65%;
}

.row_2 {

    width: 35%;
}

.row_separation {
    border: 0.5px solid black;
    width: 75%;
    height: 0%;
}
</style>
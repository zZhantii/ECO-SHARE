<template>
    <div class="container d-flex justify-content-between y-4">
        <div class="row row_1 gap-4 flex-column">
            <div class="col-12 border rounded">
                <div class="d-flex">
                    <Timeline :value="getTimelineEvents(tripList)" layout="horizontal" align="top"
                        class="border-end w-75 px-2">
                        <template #marker="slotProps">
                            <i class="pi pi-map-marker px-2" style="font-size: 1.5rem"></i>
                            <p class="m-0 px-2">{{ slotProps.item.time }}</p>
                        </template>
                        <template #content="slotProps">
                            <div class="timeline-event">
                                <p class="m-0 px-3">{{ slotProps.item.location }}</p>
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
                <div class="border-top p-3 mt-2">
                    <p>Labels</p>
                </div>
            </div>
            <div class="col-12 border rounded">
                <Map v-if="!showFirstMap" :origin="start_point" :destination="end_point"
                    @updateMapsInfo="handleMapsInfo" />
            </div>

        </div>
        <div class="row row_2 border rounded justify-content-center p-5">

            <div class="col d-flex align-items-center flex-column">
                <h3>Conductor</h3>
                <div class="circle my-2">
                    <img :src="user.photo" alt="user photo" />
                </div>
                <div class="d-flex gap-5" v-for="(user, index) in user" :key="index">
                    <div>
                        <ul class="d-flex align-items-center flex-column p-0">
                            <b class="mb-3">Usuario</b>
                            <li class="d-flex ">{{ user.alias }}</li>
                            <b class="my-3">Apellido 1</b>
                            <li class="d-flex">{{ user.surname1 }}</li>
                            <b class="my-3">Correo</b>
                            <li class="d-flex">{{ user.email }}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="d-flex align-items-center flex-column p-0">
                            <b class="mb-3">Nombre</b>
                            <li class="d-flex ">{{ user.name }}</li>
                            <b class="my-3">Apellido 2</b>
                            <li class="d-flex">{{ user.surname2 }}</li>
                            <b class="my-3">Rating</b>
                            <li class="d-flex">
                                <Rating v-model="rating" disabled />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row_separation"></div>
            <div class="col d-flex align-items-center flex-column">
                <h3>Vehiculo</h3>
                <div class="d-flex gap-5">
                    <div>
                        <ul class="d-flex align-items-center flex-column p-0">
                            <b class="mb-3">Marca</b>
                            <li class="d-flex ">{{ vehicle.brand }}</li>
                            <b class="my-3">Placa</b>
                            <li class="d-flex">{{ vehicle.plate }}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="d-flex align-items-center flex-column p-0">
                            <b class="mb-3">Modelo</b>
                            <li class="d-flex ">{{ vehicle.model }}</li>
                            <b class="my-3">Tipo</b>
                            <li class="d-flex">{{ vehicle.fuel_type }}</li>
                        </ul>
                    </div>
                </div>
                <div class="row_separation"></div>
                <div class="col d-flex flex-column align-items-center">
                    <h3>Coste</h3>
                    <h4>{{ tripList.price }} €</h4>
                    <p>Coste minimo</p>
                    <h4>{{ lowPrice(tripList.price) }}</h4>
                </div>
                <div class="col">
                    <button @click="PostTrip" class="btn btn-primary">Reservar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Components
import Map from "@/components/Map.vue";

// Store
import { useTripStore } from "@/store/trip.js";
const tripStore = useTripStore();
const start_point = ref(null);
const end_point = ref(null);


// Composables
import useTrips from "@/composables/trips";
import useVehicles from "@/composables/vehicles";
import useUsers from "@/composables/users";

const { getTrip, tripList, reservedTrip } = useTrips();
const { getUser, user } = useUsers();
const { getVehicle, vehicle } = useVehicles();

// Routes
import { useRoute } from "vue-router";
const route = useRoute();

const tripId = route.params.id;
const seats = route.params.seats;

// PrimeVue
import Timeline from "primevue/timeline";
import { useToast } from "primevue";
import Rating from "primevue/rating";

const toast = useToast();
const rating = ref(null);

// Vue
import { onMounted, ref } from "vue";


onMounted(async () => {
    await getTrip(tripId);
    console.log("tripList", tripList.value);
    // await getUser(tripList.value.user_id);
    // console.log("User por ID", user.value);
    await getVehicle(tripList.value.vehicle_id);
    // console.log("Vehicle por ID", vehicle.value);

    start_point.value = tripStore.tripData.start_point;
    console.log(tripStore.tripData.start_point);
    end_point.value = tripStore.tripData.end_point;
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

const price = ref(null);
const finalPrice = ref(null);
price.value = tripList.price;

const lowPrice = (price) => {
    console.log("precio", price)
    const available_seats = tripList.value.available_seats;
    finalPrice.value = price / available_seats;

    return finalPrice
}

function formatDate(dateTime) {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
        return "Invalid time";
    }
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

function getTimelineEvents(tripList) {
    return [
        {
            location: tripList.start_point?.address,
            time: tripList.departure_time,
        },
        {
            location: tripList.end_point?.address,
            time: tripList.arrival_time,
        },
    ];
}

const PostTrip = async () => {
    try {
        await reservedTrip(tripList, tripId, seats);

        toast.add({
            severity: "success",
            summary: "¡Asiento Reservado!",
            detail: "El asiento ha sido reservado exitosamente.",
            life: 3000,
        });

    } catch (error) {
        console.error("Error Reservando el asiento:", error);
        toast.add({
            severity: "error",
            summary: "Error",
            detail: "No se pudo guardar el asiento.",
            life: 3000,
        });
    }
}
</script>

<style scoped>
.row_1 {
    width: 65%;
    margin-top: 30px;
    margin-bottom: 30px;
}

.row_2 {
    width: 35%;
    margin-top: 30px;
    margin-bottom: 30px;
}

.row_separation {
    border: 0.5px solid black;
    width: 75%;
    height: 0%;
    margin-top: 16px;
    margin-bottom: 16px;
}

ul {
    list-style-type: none;
}

.circle {
    border: 1px solid black;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    overflow: hidden;
}
</style>
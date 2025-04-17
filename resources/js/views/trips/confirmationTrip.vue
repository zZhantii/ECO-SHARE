<template>
    <div class="container-fluid py-4">
        <div class="row">
            <!-- COLUMNA IZQUIERDA - Viaje y Mapa -->
            <div class="col-12 col-lg-7 mb-4 mb-lg-0">
                <!-- Tarjeta de ruta con timeline -->
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-9">
                                <Timeline :value="getTimelineEvents(tripList)" layout="horizontal" align="top"
                                    class="w-100">
                                    <template #marker="slotProps">
                                        <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
                                        <p class="m-0 small">{{ slotProps.item.time }}</p>
                                    </template>
                                    <template #content="slotProps">
                                        <div class="timeline-event">
                                            <p class="m-0">{{ slotProps.item.location }}</p>
                                        </div>
                                    </template>
                                </Timeline>
                            </div>
                            <div class="col-md-3 d-flex align-items-center border-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#0d6efd"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                                    </path>
                                </svg>
                                <span class="ms-2 fw-medium">{{ tripList.available_seats }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <p class="m-0">Labels</p>
                    </div>
                </div>

                <!-- Mapa -->
                <div class="card shadow-sm">
                    <div class="card-body p-0" style="min-height: 400px;">
                        <!-- <Map v-if="!showFirstMap" :origin="start_point" :destination="end_point"
              @updateMapsInfo="handleMapsInfo" /> -->
                        <div class="bg-light p-5 text-center text-muted"
                            style="height: 400px; display: flex; align-items: center; justify-content: center;">
                            Mapa no disponible
                        </div>
                    </div>
                </div>
            </div>

            <!-- COLUMNA DERECHA - Información -->
            <div class="col-12 col-lg-5">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <!-- Conductor -->
                        <div class="text-center mb-4">
                            <h3 class="fw-bold mb-3">Conductor</h3>
                            <div class="mb-3">
                                <div class="rounded-circle overflow-hidden mx-auto"
                                    style="width: 120px; height: 120px;">
                                    <img :src="user.photo" alt="user photo" class="img-fluid" />
                                </div>
                            </div>
                            <div class="row" v-for="(user, index) in user" :key="index">
                                <!-- Aquí iría la información del usuario (comentada en tu código original) -->
                            </div>
                        </div>

                        <hr class="my-4">

                        <!-- Vehículo -->
                        <div class="mb-4">
                            <h3 class="fw-bold text-center mb-3">Vehículo</h3>
                            <div class="row text-center">
                                <div class="col-6 mb-3">
                                    <p class="text-muted mb-1">Marca</p>
                                    <p class="fw-medium">{{ vehicle.brand }}</p>
                                </div>
                                <div class="col-6 mb-3">
                                    <p class="text-muted mb-1">Modelo</p>
                                    <p class="fw-medium">{{ vehicle.model }}</p>
                                </div>
                                <div class="col-6">
                                    <p class="text-muted mb-1">Placa</p>
                                    <p class="fw-medium">{{ vehicle.plate }}</p>
                                </div>
                                <div class="col-6">
                                    <p class="text-muted mb-1">Tipo</p>
                                    <p class="fw-medium">{{ vehicle.fuel_type }}</p>
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <!-- Coste -->
                        <div class="text-center mb-4">
                            <h3 class="fw-bold mb-3">Coste</h3>
                            <h2 class="display-6 fw-bold text-primary">{{ tripList.price }} €</h2>
                            <p class="text-muted">Coste mínimo</p>
                            <h4>{{ lowPrice(tripList.price) }}</h4>
                        </div>

                        <!-- Botón de reserva -->
                        <div class="d-grid">
                            <button @click="PostTrip" class="btn btn-primary btn-lg py-3 fw-medium">
                                Reservar ahora
                            </button>
                        </div>
                    </div>
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
/* .row_1 {
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
} */
</style>
<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-6 pe-md-2">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
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
                            <div class="col-12 mt-3">
                                <div class="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#0d6efd"
                                        viewBox="0 0 256 256">
                                        <path
                                            d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                                        </path>
                                    </svg>
                                    <span class="ms-2 fw-medium">{{ tripList.available_seats }}</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <span v-for="(tag, tagIndex) in tagsData" :key="tagIndex"
                                    class="badge rounded-pill bg-light text-dark border me-1 mb-1">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm map-wrapper">
                    <div class="card-body p-0">
                        <Map v-if="!showFirstMap" :origin="start_point" :destination="end_point"
                            @updateMapsInfo="handleMapsInfo" class="map-container" />
                    </div>
                </div>
            </div>

            <div class="col-md-6 ps-md-2 mt-4 mt-md-0">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <div v-if="user && user.length > 0">
                            <div v-for="(user, index) in user" :key="index">
                                <div class="user-info mb-4">
                                    <h3 class="fw-bold text-center mb-3">Información del Usuario</h3>

                                    <div class="text-center mb-4">
                                        <!-- User Image Section -->
                                        <div class="user-image-container d-inline-block">
                                            <img :src="user.media && user.media.length > 0
                                                ? user.media[0].original_url
                                                : '/images/default-avatar.png'" :alt="user.name"
                                                class="rounded-circle user-avatar" />
                                        </div>
                                    </div>

                                    <!-- User Info Section -->
                                    <div class="row row-cols-1 row-cols-sm-2 g-3 text-center">
                                        <div class="col">
                                            <p class="text-muted mb-1">Usuario</p>
                                            <p class="fw-medium">{{ user.alias }}</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-1">Nombre</p>
                                            <p class="fw-medium">{{ user.name }}</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-1">Apellido 1</p>
                                            <p class="fw-medium">{{ user.surname1 }}</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-1">Apellido 2</p>
                                            <p class="fw-medium">{{ user.surname2 }}</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-1">Correo</p>
                                            <p class="fw-medium">{{ user.email }}</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-1">Rating</p>
                                            <p class="fw-medium">
                                                <Rating v-model="rating" disabled />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="vehicle-info mb-4">
                            <h3 class="fw-bold text-center mb-3">Vehículo</h3>
                            <div class="row row-cols-1 row-cols-sm-2 g-3 text-center">
                                <div class="col">
                                    <p class="text-muted mb-1">Marca</p>
                                    <p class="fw-medium">{{ vehicle.brand }}</p>
                                </div>
                                <div class="col">
                                    <p class="text-muted mb-1">Modelo</p>
                                    <p class="fw-medium">{{ vehicle.model }}</p>
                                </div>
                                <div class="col">
                                    <p class="text-muted mb-1">Placa</p>
                                    <p class="fw-medium">{{ vehicle.plate }}</p>
                                </div>
                                <div class="col">
                                    <p class="text-muted mb-1">Tipo</p>
                                    <p class="fw-medium">{{ vehicle.fuel_type }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="cost-info text-center mb-4">
                            <h3 class="fw-bold mb-3">Coste</h3>
                            <h2 class="display-6 fw-bold text-primary">{{ tripList.price }} €</h2>
                            <p class="text-muted">Coste mínimo</p>
                            <h4>{{ lowPrice(tripList.price) }}</h4>
                        </div>

                        <div class="d-grid justify-content-center w-100">
                            <button @click="PostTrip" class="btn btn-primary btn-lg py-3 fw-medium">
                                Reservar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
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
import useRates from "@/composables/rates";
import useTags from "@/composables/tags";
import useReserves from "@/composables/reserves";

const { createReserve } = useReserves();
const { getTagWithID, tag } = useTags();
const { getRateWithId2, rate } = useRates();
const { getTrip, tripList, reservedTrip, getTagTrips, tags } = useTrips();
const { getUser, user } = useUsers();
const { getVehicle, vehicle } = useVehicles();

// Routes
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
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


const tagsData = ref([]);

onMounted(async () => {
    try {
        await getTrip(tripId);
        await getUser(tripList.value.user_id);
        await getVehicle(tripList.value.vehicle_id);
        await getRateWithId2(tripList.value.user_id);

        if (rate.value) {
            rating.value = rate.value.pivot.rate;
        } else {
            rating.value = 0;
        }

        await getTagTrips(tripId);

        if (tags.value && tags.value.length > 0) {
            for (const tagId of tags.value) {
                await getTagWithID(tagId);
                if (tag.value) {
                    tagsData.value.push(tag.value.tag_name);
                }
            }
        } else {
            console.log('No hay tags disponibles');
        }

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
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
    // console.log("precio", price)
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
        const newTrip = ref({});
        newTrip.value = {
            trip_id: tripList.value.id,
            user_id: tripList.value.user_id,
            seats_reserved: seats,
            reservation_date: new Date(),
            price: tripList.value.price,
        };

        // console.log("newTrip", newTrip.value);

        await createReserve(newTrip);

        router.push({ name: "ManageTrips" });

    } catch (error) {
        console.log("Error Reservando el asiento:", error);
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
.container-fluid {
    max-width: 1400px;
    margin: 0 auto;
}

.map-wrapper {
    height: calc(100vh - 450px);
    min-height: 400px;
}

.map-container {
    width: 100%;
    height: 100%;
}


@media (min-width: 768px) {
    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }
}

@media (max-width: 767.98px) {
    .map-wrapper {
        height: 300px;
        min-height: auto;
    }

    .vehicle-info .row {
        --bs-gutter-y: 1rem;
    }
}

.user-image-container {
    width: 100%;
    padding: 1rem;
}

.user-avatar {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 3px solid #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
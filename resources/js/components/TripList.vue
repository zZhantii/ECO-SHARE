<template>
    <div class="container d-flex justify-content-center">
        <div v-if="trip" class="row w-75">
            <div class="col">
                <Timeline :value="getTimelineEvents(trip)" layout="horizontal" align="top" class="w-75">
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
                <div class="col mt-3 pt-4 border-top d-flex">
                    <div class="w-25 d-flex align-itemns-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                            viewBox="0 0 256 256">
                            <path
                                d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                            </path>
                        </svg>
                        <p class="m-0">{{ trip.available_seats }}</p>
                    </div>
                    <div class="w-75 border-start ps-2">
                        <p>labels</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="trip && !tripId" class="row w-25 border-start">
            <div class="col d-flex flex-column justify-content-center align-items-center gap-3">
                <span class="text-xl font-semibold">${{ trip.price }}</span>
                <router-link :to="{ name: 'ConfirmationTrips', params: { id: trip.id } }"
                    class="btn-primary">Reserva</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Timeline from "primevue/timeline";
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps({
    trip: {
        type: Object,
        required: false,
    },
    tripId: {
        type: String,
        required: false,
    }
});

const trip = ref(props.trip || null);

onMounted(async () => {
    if (props.tripId) {
        try {
            const response = await axios.get(`/api/trip/${props.tripId}`);
            trip.value = response.data.data;
            console.log("Trip cargado:", trip.value);
        } catch (error) {
            console.error("Error al obtener el trip:", error);
        }
    }
});

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
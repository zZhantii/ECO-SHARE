<template>
    <!-- Se utliza el componete que abre os dates del viaje con un boolean de control del dialog y otro para verificar
     si es usuario junto con e viaje seleccionado -->
    <DialogTripDetails
        v-model:visibleDialog="visibleDialog"
        v-model:passenger="passenger"
        :selectedTrip="selectedTrip"
    />
    <div class="timeline mb-3 ps-2 mt-3 rounded-1">
        <Timeline
            :value="getTimelineEvents(trip)"
            layout="horizontal"
            align="top"
            class="d-flex justifi-content-center"
        >
            <template #marker="slotProps">
                <i class="pi pi-map-marker px-2" style="font-size: 1.5rem"></i>
                <p class="item-destination">
                    {{ slotProps.item.time }}
                </p>
            </template>
        </Timeline>
        <div
            class="ms-5 me-5 mb-3 d-flex justify-content-between time-line-directions"
        >
            <div>
                <p>
                    <strong> {{ trip.start_point.address }}</strong>
                </p>
            </div>
            <div>
                <p>
                    <strong> {{ trip.end_point.address }}</strong>
                </p>
            </div>
        </div>

        <div class="d-flex gap-2 justify-content-between ms-3 me-2">
            <div
                v-if="trip.cancelled_at != null"
                class="d-flex align-items-center gap-3"
            >
                <i class="fa-solid fa-ban" style="color: red"></i>
                <p style="color: #054851">
                    <strong> Viaje cancelado por el conductor</strong>
                </p>
            </div>

            <div
                v-else-if="trip.pivot.cancelled_at != null"
                class="d-flex align-items-center gap-3"
            >
                <i class="fa-solid fa-ban" style="color: red"></i>
                <p style="color: #054851">
                    <strong> Viaje cancelado por el pasajero</strong>
                </p>
            </div>

            <div
                v-else-if="trip.drive_end != null"
                class="d-flex align-items-center gap-3"
            >
                <i class="fa-solid fa-circle-check" style="color: green"></i>
                <p>Viaje finalizado</p>
            </div>

            <Button
                class="btn-secondary m-3"
                label="Ver detalles"
                @click="showTripDetails()"
            />
        </div>
    </div>
</template>
<script setup>
import Timeline from "primevue/timeline";
import { ref } from "vue";
import DialogTripDetails from "./DialogTripDetails.vue";

// Definición de los props que recibe desde ManageTrips.vue con el viaje concreto a mostrar en la card
// el control del modal de detalles, y el control del modal como pasajero
function getTimelineEvents(trip) {
    return [
        {
            location:
                trip.start_point.address == trip.start_point.locality
                    ? trip.start_point.locality
                    : trip.start_point.address +
                      ", " +
                      trip.start_point.locality,
            time: trip.departure_time,
        },
        {
            location:
                trip.end_point.address == trip.end_point.locality
                    ? trip.end_point.locality
                    : trip.end_point.address + ", " + trip.end_point.locality,
            time: trip.arrival_time,
        },
    ];
}

// Definición de los props que recibe desde ManageTrips.vue con el viaje concreto a mostrar en la card
// el control del modal de detalles, y el control del modal como pasajero
const props = defineProps({
    trip: Object,
    visibleDialog: Boolean,
    passenger: Boolean,
});

const visibleDialog = ref(props.visibleDialog);
const passenger = ref(props.passenger);
const selectedTrip = props.trip;

// Método que acciona el modal
const showTripDetails = () => {
    visibleDialog.value = true;
    passenger.value = true;
};
</script>
<style scoped>
.timeline {
    width: 97% !important;
}
</style>

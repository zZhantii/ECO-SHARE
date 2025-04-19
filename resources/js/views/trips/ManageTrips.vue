<template>
    <main class="container">
        <RatingDialog
            v-model:ratingDialog="ratingDialog"
            :tripsToRate="tripsToRate"
        />

        <div class="container mt-5 d-flex flex-column align-items-center">
            <div class="gradient-img"></div>

            <div
                v-if="
                    activeDriverTripsList.length > 0 ||
                    activePassengerTripsList.length
                "
                class="container mb-5"
            >
                <h1 class="fs-3 text-center m-5">
                    Revisa aquí tus próximos viajes
                </h1>
                <DialogTripDetails
                    v-show="
                        activeDriverTripsList.length > 0 ||
                        activePassengerTripsList.length > 0 ||
                        passengerHistory.length > 0 ||
                        driverHistory.length > 0
                    "
                    v-model:visibleDialog="visibleDialog"
                    v-model:passenger="passenger"
                    :selectedTrip="selectedTrip"
                />

                <div
                    class="d-flex flex-column align-items-center"
                    v-if="activeDriverTripsList.length > 0"
                >
                    <div class="d-flex gap-5 mt-5">
                        <i class="fa-solid fa-car"></i>
                        <p>Como conductor</p>
                    </div>

                    <ul class="col-sm-11 col-md-7 p-0">
                        <li v-for="trip in activeDriverTripsList">
                            <div
                                class="timeline mb-4 m-4 p-4 pt-2 pb-3 rounded-1"
                            >
                                <Timeline
                                    :value="getTimelineEvents(trip)"
                                    layout="horizontal"
                                    align="top"
                                    class="d-flex justifi-content-center"
                                >
                                    <template #marker="slotProps">
                                        <i
                                            class="pi pi-map-marker px-2"
                                            style="font-size: 1.5rem"
                                        ></i>
                                        <p class="item-destination">
                                            {{ slotProps.item.time }}
                                        </p>
                                    </template>
                                    <template #content="slotProps">
                                        <div class="timeline-event w-50">
                                            <p class="">
                                                {{ slotProps.item.location }}
                                            </p>
                                        </div>
                                    </template>
                                </Timeline>
                                <div
                                    v-if="trip.drive_start == null"
                                    class="d-flex gap-2 align-items-center"
                                >
                                    <i class="fa-solid fa-stopwatch"></i>
                                    <p class="mt-4 mb-4">
                                        {{ getTimeToBoarding(trip) }}
                                    </p>
                                </div>
                                <div
                                    v-else-if="trip.drive_end == null"
                                    class="d-flex gap-2 align-items-center"
                                >
                                    <i class="fa-regular fa-compass"></i>
                                    <p class="mt-4 mb-4">En transito</p>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <Toast />
                                        <ConfirmPopup />
                                        <Button
                                            v-if="
                                                checkBoarding(
                                                    trip.drive_start,
                                                    trip.departure_time
                                                ) &&
                                                trip.drive_start == null &&
                                                trip.cancelled_at == null
                                            "
                                            class="btn-secondary m-1"
                                            label="Iniciar viaje"
                                            @click="confirmStart(trip)"
                                        />
                                        <Button
                                            v-if="
                                                trip.drive_start == null &&
                                                trip.drive_start == null &&
                                                trip.cancelled_at == null
                                            "
                                            class="btn-cancel m-3"
                                            label="Cancelar viaje"
                                            @click="confirmCancell(trip)"
                                        />
                                        <Button
                                            v-if="
                                                trip.drive_end == null &&
                                                trip.drive_start != null
                                            "
                                            class="btn-secondary m-1"
                                            label="Finalizar viaje"
                                            @click="confirmEnd(trip)"
                                        />
                                        <div
                                            v-if="trip.drive_end != null"
                                            class="d-flex align-items-center gap-3"
                                        >
                                            <i
                                                class="fa-solid fa-circle-check"
                                                style="color: green"
                                            ></i>
                                            <p style="color: #054851">
                                                <strong>
                                                    Viaje finalizado</strong
                                                >
                                            </p>
                                        </div>
                                        <div
                                            v-if="trip.cancelled_at != null"
                                            class="d-flex align-items-center gap-3"
                                        >
                                            <i
                                                class="fa-solid fa-ban"
                                                style="color: red"
                                            ></i>
                                            <p style="color: #054851">
                                                <strong>
                                                    Viaje cancelado</strong
                                                >
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        class="btn-secondary m-3"
                                        label="Ver detalles"
                                        @click="showTripDetails(trip.id)"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div
                    class="d-flex flex-column align-items-center mt-3 mb-3"
                    v-if="activePassengerTripsList.length > 0"
                >
                    <div class="d-flex gap-5 mt-5">
                        <i class="fa-solid fa-users-between-lines"></i>
                        <p>Como pasajero</p>
                    </div>

                    <ul class="col-sm-11 col-md-7 p-0">
                        <li v-for="trip in activePassengerTripsList">
                            <div class="timeline mb-3 m-4 p-3 rounded-1">
                                <Timeline
                                    :value="getTimelineEvents(trip)"
                                    layout="horizontal"
                                    align="top"
                                    class="d-flex justifi-content-center"
                                >
                                    <template #marker="slotProps">
                                        <i
                                            class="pi pi-map-marker px-2"
                                            style="font-size: 1.5rem"
                                        ></i>
                                        <p class="item-destination">
                                            {{ slotProps.item.time }}
                                        </p>
                                    </template>
                                    <template #content="slotProps">
                                        <div class="timeline-event w-50">
                                            <p class="">
                                                {{ slotProps.item.location }}
                                            </p>
                                        </div>
                                    </template>
                                </Timeline>
                                <p
                                    v-if="
                                        trip.pivot.check_in == null &&
                                        trip.pivot.cancelled_at == null
                                    "
                                >
                                    El check-in abre 60 minutos antes del inicio
                                    previsto del viaje
                                </p>

                                <div
                                    class="d-flex gap-2 justify-content-between"
                                >
                                    <div
                                        v-if="
                                            trip.drive_start != null &&
                                            trip.pivot.check_in == null
                                        "
                                        class="d-flex align-items-center gap-3"
                                    >
                                        <i
                                            class="fa-solid fa-ban"
                                            style="color: red"
                                        ></i>
                                        <p style="color: #054851">
                                            <strong>
                                                El viaje ha comenzado y no has
                                                podido realizar el
                                                check-in.</strong
                                            >
                                        </p>
                                    </div>
                                    <div
                                        v-else-if="
                                            trip.pivot.check_in == null &&
                                            trip.pivot.cancelled_at == null &&
                                            trip.cancelled_at == null
                                        "
                                    >
                                        <Toast />
                                        <ConfirmPopup />
                                        <Button
                                            v-if="
                                                checkBoarding(
                                                    trip.drive_start,
                                                    trip.departure_time,
                                                    true
                                                ) &&
                                                trip.pivot.cancelled_at == null
                                            "
                                            class="btn-secondary m-1"
                                            label="Check-In"
                                            @click="checkIn(trip)"
                                        />

                                        <Button
                                            class="btn-secondary m-1"
                                            label="Cancelar viaje"
                                            @click="confirmCancell(trip, true)"
                                        />
                                    </div>
                                    <div
                                        v-else-if="trip.cancelled_at != null"
                                        class="d-flex align-items-center gap-3"
                                    >
                                        <i
                                            class="fa-solid fa-ban"
                                            style="color: red"
                                        ></i>
                                        <p style="color: #054851">
                                            <strong>
                                                Viaje cancelado por el
                                                conductor</strong
                                            >
                                        </p>
                                    </div>

                                    <div
                                        v-else-if="
                                            trip.pivot.cancelled_at != null
                                        "
                                        class="d-flex align-items-center gap-3"
                                    >
                                        <i
                                            class="fa-solid fa-ban"
                                            style="color: red"
                                        ></i>
                                        <p style="color: #054851">
                                            <strong> Viaje cancelado</strong>
                                        </p>
                                    </div>
                                    <div
                                        v-else-if="trip.drive_end != null"
                                        class="d-flex align-items-center gap-3"
                                    >
                                        <i
                                            class="fa-solid fa-circle-check"
                                            style="color: green"
                                        ></i>
                                        <p>Viaje finalizado</p>
                                    </div>

                                    <div
                                        v-else-if="trip.pivot.check_in != null"
                                        class="d-flex align-items-center gap-3"
                                    >
                                        <i class="fa-solid fa-receipt"></i>
                                        <p>Check-in realizado</p>
                                    </div>
                                    <Button
                                        class="btn-secondary m-3"
                                        label="Ver detalles"
                                        @click="showTripDetails(trip.id, true)"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <h2 class="mb-5" v-else>No tienes viajes activos</h2>

            <Accordion
                v-if="passengerHistory.length > 0 || driverHistory.length > 0"
                class="col-sm-12 col-md-7 mt-3 mb-5"
            >
                <AccordionPanel v-if="driverHistory.length > 0" value="0">
                    <AccordionHeader
                        ><div class="d-flex gap-4">
                            <i class="fa-solid fa-car"></i>
                            <p>Historial como conductor</p>
                        </div></AccordionHeader
                    >
                    <AccordionContent>
                        <ul class="p-0">
                            <li v-for="trip of driverHistory">
                                <CardDriverHistory
                                    :trip="trip"
                                    v-model:visibleDialog="visibleDialog"
                                    v-model:passenger="passenger"
                                />
                            </li></ul
                    ></AccordionContent>
                </AccordionPanel>
                <AccordionPanel
                    v-if="passengerHistory.length > 0"
                    class="mt-3 mb-5"
                    value="1"
                >
                    <AccordionHeader
                        ><div class="d-flex gap-4">
                            <i class="fa-solid fa-users-between-lines"></i>
                            <p>Historial como pasajero</p>
                        </div></AccordionHeader
                    >
                    <AccordionContent>
                        <ul class="p-0">
                            <li
                                v-for="trip of passengerHistory"
                                class="d-flex justify-content-center"
                            >
                                <CardPassengerHistory :trip="trip" />
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </main>
</template>
<script setup>
import Accordion from "primevue/accordion";
import useTrips from "@/composables/trips.js";
import { ref, onMounted } from "vue";
import Timeline from "primevue/timeline";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import CardPassengerHistory from "../../components/CardPassengerHistory.vue";
import CardDriverHistory from "../../components/CardDriverHistory.vue";
import DialogTripDetails from "../../components/DialogTripDetails.vue";
import RatingDialog from "../../components/RatingDialog.vue";
import Rating from "primevue/rating";

import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

const visibleDialog = ref(false);

const {
    getActiveTrips,
    activeDriverTripsList,
    activePassengerTripsList,
    startDrive,
    endDrive,
    cancellTripAsDriver,
    cancellTripAsPassenger,
    makeCheckIn,
    tripsToRate,
    driverHistory,
    passengerHistory,
    getDriverHistory,
    getPassengerHistory,
} = useTrips();

const confirm = useConfirm();
const toast = useToast();
const selectedTrip = ref({});
const passenger = ref(false);
const ratingDialog = ref(false);

onMounted(async () => {
    await getActiveTrips();
    await getDriverHistory();
    ratingDialog.value = await getPassengerHistory();

    console.log("viajes como pasajero", passengerHistory.value);
});

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getTimeToBoarding(trip) {
    const start = new Date(trip.departure_time);
    const now = new Date();

    const diff = Math.abs(start - now);
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    if (hours >= 24) {
        return "Aún falta un día o más para poder iniciar el viaje";
    }
    if (start <= now) {
        return "Ha llegado la hora de comenzar el viaje";
    }

    if (!trip.drive_start) {
        return hours != 0
            ? `Falta ${hours} hora/s y ${minutes} minuto/s para iniciar el viaje`
            : `Falta ${minutes} minuto/s para el inicio del viaje`;
    }
}

function checkIn(trip) {
    confirm.require({
        message: "Seguro que quieres hacer check-in?",
        header: "Confirmar",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Hacer check-in",
        },
        accept: () => {
            makeCheckIn(trip);
        },
        reject: () => {
            toast.add({
                severity: "info",
                summary: "No se ha cancelado el viaje",

                life: 3000,
            });
        },
    });
}

function checkBoarding(driveStart, startTime, passenger = false) {
    const start = new Date(startTime);
    const now = new Date();

    const minutesDiff = (start - now) / 1000 / 60;

    if (!passenger && minutesDiff <= 0 && minutesDiff >= -60) {
        return true;
    }

    if (
        passenger &&
        minutesDiff <= 60 &&
        minutesDiff >= 0 &&
        driveStart == null
    ) {
        return true;
    }

    return false;
}

const showTripDetails = (tripId, show = false) => {
    visibleDialog.value = true;
    passenger.value = show;
    let trip = null;
    if (!passenger.value) {
        trip = activeDriverTripsList.value.find((trip) => trip.id === tripId);
        console.log("conducot");
    } else {
        trip = activePassengerTripsList.value.find(
            (trip) => trip.id === tripId
        );

        console.log("pasajero");
    }

    if (trip) {
        selectedTrip.value = trip;
        console.log("selectedTrip", selectedTrip.value);
    }
};

const confirmStart = (trip) => {
    confirm.require({
        message: "Seguro que quieres iniciar el viaje?",
        header: "Confirmar",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Iniciar viaje",
        },
        accept: () => {
            startDrive(trip.id);
        },
        reject: () => {
            toast.add({
                severity: "info",
                summary: "Inicio cancelado",
                detail: "No se ha iniciado el viaje",
                life: 3000,
            });
        },
    });
};

const confirmCancell = (trip, passenger = false) => {
    if (!passenger) {
        confirm.require({
            message: "Seguro que quieres cancelar el viaje?",
            header: "Confirmar",
            icon: "pi pi-exclamation-triangle",
            rejectProps: {
                label: "Cancelar",
                severity: "secondary",
                outlined: true,
            },
            acceptProps: {
                label: "Cancelar viaje",
            },
            accept: () => {
                cancellTripAsDriver(trip.id);
            },
            reject: () => {
                toast.add({
                    severity: "info",
                    summary: "No se ha cancelado el viaje",

                    life: 3000,
                });
            },
        });
    } else {
        confirm.require({
            message: "Seguro que quieres cancelar el viaje?",
            header: "Confirmar",
            icon: "pi pi-exclamation-triangle",
            rejectProps: {
                label: "Cancelar",
                severity: "secondary",
                outlined: true,
            },
            acceptProps: {
                label: "Cancelar viaje",
            },
            accept: () => {
                cancellTripAsPassenger(trip.id);
            },
            reject: () => {
                toast.add({
                    severity: "info",
                    summary: "No se ha cancelado el viaje",

                    life: 3000,
                });
            },
        });
    }
};

const confirmEnd = (trip) => {
    confirm.require({
        message: "Seguro que quieres finalizar el viaje?",
        header: "Confirmar",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Finalizar viaje",
        },
        accept: () => {
            endDrive(trip.id);
        },
        reject: () => {
            toast.add({
                severity: "info",
                summary: "No se ha finalizado el viaje",

                life: 3000,
            });
        },
    });
};
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
</script>
<style>
.gradient-img {
    height: 17rem;
    width: 17rem;
    background: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.9),
            rgba(0, 0, 0, 0)
        ),
        url("/images/your_trips.webp");
    background-size: cover;
    background-position: center;
    border-radius: 10px;
}
main {
    min-height: 74vh;
}

.timeline {
    border: 1px solid rgb(218, 218, 218);
}
.fa-solid.fa-car,
.fa-solid.fa-users-between-lines {
    font-size: 25px;
    color: #054851;
}

ul {
    list-style: none;
}
.item-destination {
    width: 120px !important;
}
i {
    font-size: 25px !important;
}

:deep(.p-timeline-event) {
    height: 100% !important;
}
.passenger-list {
    background-color: rgb(246, 246, 246);
    border-radius: 20px;
    padding: 10px;
    padding-top: 5px;
}
.timeline-directions {
    width: 85% !important;
}
#undefined_accordioncontent_1,
#undefined_accordioncontent_0 {
    background-color: white !important;
}

.timeline-item {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.trip-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
}

.user-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
}

.user-avatar,
.avatar-placeholder {
    margin-bottom: 0.5rem;
}

.user-name {
    font-weight: 600;
    margin: 0;
    text-align: center;
}

.trip-info {
    flex-grow: 1;
}

.route,
.date {
    margin: 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.rating-section {
    min-width: 200px;
    display: flex;
    justify-content: center;
}
</style>

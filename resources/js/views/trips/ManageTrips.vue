<template>
    <main class="container">
        <div class="container mt-5 d-flex flex-column align-items-center">
            <div class="gradient-img"></div>

            <div
                v-if="
                    activeDriverTripsList.length > 0 ||
                    activePassengerTripsList.length
                "
                class="container"
            >
                <h1 class="fs-3 text-center m-5">
                    Revisa aquí tus próximos viajes
                </h1>
                <Dialog
                    v-model:visible="visibleDriver"
                    modal
                    header="Detalles del viaje"
                    :style="{
                        width: '30rem',
                    }"
                >
                    <div class="mb-5">
                        <div v-if="!passenger">
                            <p>
                                Precio:
                                <strong>{{ selectedTrip.price }} €</strong>
                            </p>
                            <p>
                                Plazas ofertadas:
                                <strong
                                    >{{ selectedTrip.available_seats }}
                                </strong>
                            </p>

                            <p>
                                Vehículo:
                                <strong
                                    >{{ selectedTrip.vehicle.brand }}
                                </strong>
                            </p>
                            <p>
                                Vehículo:
                                <strong
                                    >{{ selectedTrip.vehicle.model }}
                                </strong>
                            </p>
                            <div v-if="!passenger">
                                <h3 class="fs-5 mt-4">Lista de pasajeros:</h3>
                                <ul
                                    v-if="selectedTrip.reserves.length != 0"
                                    class="ps-0 passenger-list"
                                >
                                    <li
                                        class="gap-5 p-1 d-flex align-items-center gap-3 ms-3"
                                        v-for="passenger in selectedTrip.reserves"
                                    >
                                        <i
                                            v-if="
                                                passenger.pivot.cancelled_at !=
                                                null
                                            "
                                            class="ms-1 fa-solid fa-xmark"
                                            style="color: red"
                                        ></i>
                                        <i
                                            v-else-if="
                                                passenger.pivot.check_in == null
                                            "
                                            class="ms-1 fa-solid fa-hourglass-half"
                                        ></i>

                                        <i
                                            v-else
                                            class="fa-solid fa-circle-check"
                                            style="color: green"
                                        ></i>

                                        <p class="fs-4 m-0">
                                            {{ passenger.alias }}
                                        </p>
                                    </li>
                                </ul>
                                <p v-else>
                                    <strong
                                        >No hay reservas de pasajeros</strong
                                    >
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <div>
                                <p>
                                    Precio total a pagar
                                    <strong class="ms-2"
                                        >{{ selectedTrip.price }} €</strong
                                    >
                                </p>
                                <p>
                                    Plazas reservadas
                                    <strong class="ms-2"
                                        >{{ selectedTrip.pivot.seats_reserved }}
                                    </strong>
                                </p>
                                <p>
                                    Alias del conductor
                                    <strong class="ms-2"
                                        >{{ selectedTrip.user.alias }}
                                    </strong>
                                </p>
                                <p>
                                    Vehículo
                                    <strong class="ms-2"
                                        >{{ selectedTrip.vehicle.brand }}
                                        {{ selectedTrip.vehicle.model }}
                                    </strong>
                                </p>
                                <p>
                                    Matrícula
                                    <strong class="ms-2"
                                        >{{ selectedTrip.vehicle.plate }}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2">
                        <Button
                            type="button"
                            label="Cancelar"
                            class="btn-primary"
                            severity="secondary"
                            @click="
                                (visibleDriver = false), (passenger = false)
                            "
                        ></Button>
                    </div>
                </Dialog>
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
                                    <div
                                        v-if="
                                            checkBoarding(
                                                trip.drive_start,
                                                trip.departure_time
                                            )
                                        "
                                        class="d-flex align-items-center"
                                    >
                                        <Toast />
                                        <ConfirmPopup />
                                        <Button
                                            v-if="
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
                                            @click="cancellAsPassenger(trip)"
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

            <h2 v-else>No tienes viajes activos</h2>
            <Accordion :activeIndex="-1" class="col-sm-11 col-md-7 p-5">
                <AccordionTab class="mt-2" header="Historial de viajes">
                </AccordionTab>
            </Accordion>
        </div>
    </main>
</template>
<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useTrips from "@/composables/trips.js";
import { ref, onMounted } from "vue";
import Timeline from "primevue/timeline";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const visibleDriver = ref(false);

const {
    getActiveTrips,
    activeDriverTripsList,
    activePassengerTripsList,
    startDrive,
    endDrive,
    cancellTripAsDriver,
    cancellTripAsPassenger,
    makeCheckIn,
    driverHistory,
    passengerHistory,
    getDriverHistory,
    getPassengerHistory,
} = useTrips();

const confirm = useConfirm();
const toast = useToast();
const selectedTrip = ref({});
const passenger = ref(false);

onMounted(() => {
    getActiveTrips();
    getDriverHistory();
    getPassengerHistory();

    console.log("El historial como conductor: ", driverHistory.value);
    console.log("El historial como pasajero: ", passengerHistory.value);
});

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
    console.log("papapatata");
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

function cancellAsPassenger(trip) {
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

function checkBoarding(driveStart, startTime, passenger = false) {
    const start = new Date(startTime);
    const now = new Date();

    const minutesDiff = Math.abs(start - now) / 1000 / 60;

    if (!passenger && (minutesDiff <= 0 || start <= now - 60)) {
        return true;
    }

    if (
        passenger &&
        (minutesDiff <= 60 || start <= now - 60) &&
        driveStart == null
    ) {
        return true;
    }

    return false;
}

const showTripDetails = (tripId, show = false) => {
    visibleDriver.value = true;
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

const confirmCancell = (trip) => {
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
<style scoped>
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
.fa-solid.fa-car {
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
</style>

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

                                <div class="d-flex justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <Button
                                            v-if="
                                                trip.drive_start == null &&
                                                trip.cancelled_at == null
                                            "
                                            class="btn-secondary m-1"
                                            label="Iniciar viaje"
                                            @click="startDrive(trip.id)"
                                        />
                                        <Button
                                            v-if="
                                                trip.drive_start == null &&
                                                trip.drive_start == null &&
                                                trip.cancelled_at == null
                                            "
                                            class="btn-cancel m-3"
                                            label="Cancelar viaje"
                                            @click="
                                                cancellTripAsDriver(trip.id)
                                            "
                                        />
                                        <Button
                                            v-if="
                                                trip.drive_end == null &&
                                                trip.drive_start != null
                                            "
                                            class="btn-secondary m-1"
                                            label="Finalizar viaje"
                                            @click="endDrive(trip.id)"
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
                                        @click="visibleDriver = true"
                                    />
                                    <Dialog
                                        v-model:visible="visibleDriver"
                                        modal
                                        header="Detalles del viaje"
                                        :style="{ width: '25rem' }"
                                    >
                                        <div class="mb-5">
                                            <div>
                                                <p>
                                                    Precio:
                                                    <strong
                                                        >{{
                                                            trip.price
                                                        }}
                                                        €</strong
                                                    >
                                                </p>
                                                <p>
                                                    Plazas ofertadas:
                                                    <strong
                                                        >{{
                                                            trip.available_seats
                                                        }}
                                                    </strong>
                                                </p>
                                                <p>
                                                    Vehículo:
                                                    <strong
                                                        >{{
                                                            trip.vehicle.brand
                                                        }}
                                                    </strong>
                                                </p>
                                                <p>
                                                    Vehículo:
                                                    <strong
                                                        >{{
                                                            trip.vehicle.model
                                                        }}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                label="Cancelar"
                                                severity="secondary"
                                                @click="visibleDriver = false"
                                            ></Button>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div
                    class="d-flex flex-column align-items-center mt-3 mb-3"
                    v-if="activeDriverTripsList.length > 0"
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

                                <Button
                                    class="btn-secondary m-1"
                                    label="Iniciar viaje"
                                    @click="startDrive(trip.id)"
                                />

                                <Button
                                    class="btn-secondary m-1"
                                    label="Finalizar viaje"
                                    @click="endDrive(trip.id)"
                                />
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
import axios from "axios";

const visibleDriver = ref(false);
const {
    getActiveTrips,
    activeDriverTripsList,
    activePassengerTripsList,
    startDrive,
    endDrive,
    cancellTripAsDriver,
} = useTrips();

onMounted(() => {
    getActiveTrips();
});

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
</style>

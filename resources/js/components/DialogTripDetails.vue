<template>
    <Dialog
        v-model:visible="visibleDialog"
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
                    <strong>{{ selectedTrip.available_seats }} </strong>
                </p>

                <p>
                    Vehículo:
                    <strong>{{ selectedTrip.vehicle.brand }} </strong>
                </p>
                <p>
                    Vehículo:
                    <strong>{{ selectedTrip.vehicle.model }} </strong>
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
                                v-if="passenger.pivot.cancelled_at != null"
                                class="ms-1 fa-solid fa-xmark"
                                style="color: red"
                            ></i>
                            <i
                                v-else-if="passenger.pivot.check_in == null"
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
                        <strong>No hay reservas de pasajeros</strong>
                    </p>
                </div>
            </div>
            <div v-else>
                <div>
                    <Avatar
                        v-if="
                            selectedTrip?.user?.media?.length > 0 &&
                            selectedTrip.user.media[0].original_url
                        "
                        :image="selectedTrip.user.media[0].original_url"
                        size="xlarge"
                        shape="circle"
                        class="mb-3"
                    />
                    <Avatar
                        v-else
                        :label="
                            selectedTrip.user.alias?.charAt(0).toUpperCase()
                        "
                        size="xlarge"
                        class="mb-3"
                    />
                    <p class="d-flex mb-3">
                        Conductor
                        <strong class="ms-2"
                            >{{ selectedTrip.user.alias }}
                        </strong>
                    </p>
                </div>
                <div>
                    <p
                        v-if="
                            selectedTrip.cancelled_at == null &&
                            selectedTrip.pivot.cancelled_at == null
                        "
                    >
                        Precio total a pagar
                        <strong class="ms-2"
                            >{{ selectedTrip.pivot.total_price }} €</strong
                        >
                    </p>
                    <p>
                        Plazas reservadas
                        <strong class="ms-2"
                            >{{ selectedTrip.pivot.seats_reserved }}
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
                @click="closeDialog"
            ></Button>
        </div>
    </Dialog>
</template>
<script setup>
import { toRef } from "vue";

const props = defineProps({
    visibleDialog: Boolean,
    passenger: Boolean,
    selectedTrip: Object,
});

const visibleDialog = toRef(props, "visibleDialog");
const passenger = toRef(props, "passenger");
// Implementación de los detalles para poner a false los reactivos que abren el modal
const emit = defineEmits(["update:visibleDialog", "update:passenger"]);
const closeDialog = () => {
    emit("update:visibleDialog", false);
    emit("update:passenger", false);
};
</script>

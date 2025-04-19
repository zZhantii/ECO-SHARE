<template>
    <Dialog
        v-model:visible="visible"
        :tripsToRate="tripsToRate"
        modal
        header="Puntúa tus viajes realizados"
        :style="{ width: '50rem' }"
        ><div>
            <span>
                <p>
                    Con tus valoraciones ayudas a otros usuarios a seguir
                    viajando de forma segura en un futuro verde.
                </p>
            </span>
        </div>
        <ul class="mt-3 mb-3">
            <li class="timeline rounded-1 p-3 mb-2" v-for="trip of tripsToRate">
                <div class="trip-container">
                    <div class="user-section">
                        <Avatar
                            v-if="trip?.user.media[0]?.original_url"
                            :image="trip.user.media[0].original_url"
                            size="xlarge"
                            shape="circle"
                        />
                        <Avatar
                            v-else
                            :label="trip.user.alias?.charAt(0).toUpperCase()"
                            size="xlarge"
                        />
                        <p class="user-name">{{ trip.user.alias }}</p>
                    </div>

                    <div
                        class="trip-info flex-column d-flex align-items-center"
                    >
                        <p class="route">
                            <i class="pi pi-map-marker"></i>
                            {{ trip.start_point.locality }} →
                            {{ trip.end_point.locality }}
                        </p>
                        <p class="date">
                            <i class="pi pi-calendar"></i>
                            {{ formatDate(trip.departure_time) }}
                        </p>
                    </div>

                    <div class="rating-section">
                        <Rating
                            v-model="trip.rate"
                            @change="handleRateTrip(trip)"
                        />
                    </div>
                </div>
            </li>
        </ul>

        <div class="d-flex justify-content-end w-100 gap-2">
            <Button
                class="btn-primary"
                type="button"
                label="Salir"
                severity="secondary"
                @click="closeDialog"
            ></Button>
        </div>
    </Dialog>
</template>
<script setup>
import { ref, toRef, watch } from "vue";
import Rating from "primevue/rating";
import useTrips from "../composables/trips";
const props = defineProps({
    tripsToRate: Array,
    ratingDialog: Boolean,
});

const { rateTrip } = useTrips();
const visible = toRef(props, "ratingDialog");

const localTrips = toRef(props, "tripsToRate");
const emit = defineEmits(["update:ratingDialog", "update:tripsToRate"]);

watch(
    () => props.tripsToRate.length,
    (newLength) => {
        if (newLength === 0) {
            closeDialog();
        }
    }
);

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function closeDialog() {
    emit("update:ratingDialog", false);
}
function handleRateTrip(trip) {
    rateTrip(trip, localTrips, emit);
}
</script>

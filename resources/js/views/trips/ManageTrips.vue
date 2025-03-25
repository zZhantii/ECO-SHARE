<template>
    <main class="container">
        <div class="container mt-5 d-flex flex-column align-items-center">
            <div class="gradient-img"></div>
            <h1 class="fs-3">Revisa aquí tus próximos viajes</h1>
            <div class="container w-75">
                <ul v-if="activeDriverTripsList.length > 0">
                    <div class="d-flex gap-4 align-items-center">
                        <i class="fa-solid fa-car"></i>
                        <p>Como conductor</p>
                    </div>

                    <li class="m-4" v-for="trip in activeDriverTripsList">
                        {{ trip }}
                    </li>
                </ul>
            </div>

            <Accordion :activeIndex="-1" class="w-50">
                <AccordionTab class="w-100 mt-2" header="Historial de viajes">
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

const { getActiveTrips, activeDriverTripsList } = useTrips();

onMounted(() => {
    getActiveTrips();
});
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
.fa-solid.fa-car {
    font-size: 25px;
    color: #054851;
}
</style>

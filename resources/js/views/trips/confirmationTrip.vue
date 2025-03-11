<template>
    <div class="container d-flex justify-content-between gap-4 p-0">
        <div class="row w-75 flex-column">
            <div class="col border-1 p-5">
                <TripList :tripId="tripId" />
                <div class="col border-1 p-5">h</div>
                <div class="col border-1 p-5">h</div>
            </div>
            <div class="row w-25">
                <div class="col border-1 p-5">
                    <h2>Resumen del Viaje</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TripList from "@/components/TripList.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tripId = route.params.id;
</script>

<style scoped>
.row,
.col {
    padding: 0;
    margin: 0;
}
</style>
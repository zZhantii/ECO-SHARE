<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <h6 class="mb-2 text-primary">Reserve Details</h6>

                <div v-if="rate && rate.pivot" class="card-body">
                    <div class="form-group">
                        <Select v-model="rate.pivot.user_id" :options="users.data" filter optionLabel="name"
                            optionValue="id" dataKey="id" placeholder="Select a User" class="w-full md:w-56">
                        </Select>
                    </div>

                    <div class="form-group">
                        <Select v-model="rate.pivot.trip_id" :options="tripsList" filter
                            :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                            optionValue="id" dataKey="id" placeholder="Select a Start Point" class="w-full md:w-56"
                            </Select>
                    </div>

                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <InputNumber v-model="rate.pivot.rate" type="text" class="d-flex w-100 w-100" id="rate" :min="0"
                            :max="5" showButtons />
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.seats_reserved">
                                {{ message }}
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="submitUpdateRate">Guardar</button>
                </div>

            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const route = useRoute();

// Composables
import useRates from "@/composables/rates";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";

const { updateRate, getRateWithId, rate, rateSchema, validationErrors } = useRates();
const { getUsers, users } = useUsers();
const { getTrips, tripsList } = useTrips();

onMounted(async () => {
    await getRateWithId(route.params.user_id, route.params.trip_id);
    await getUsers();
    await getTrips();
})

const submitUpdateRate = async () => {
    try {
        console.log("rate", rate.pivot);
        updateRate(rate);
        // rateSchema.validate(rate, { abortEarly: false })
        //     .then(() => {
        //         updateRates(rate);
        //     })
    } catch (error) {
        if (error.inner) {
            error.inner.forEach((e) => {
                if (!validationErrors.value[e.path]) {
                    validationErrors.value[e.path] = [];
                }
                validationErrors.value[e.path].push(e.message);
            });
        }
    }
}
</script>

<style>
.fu-content {
    padding: 0px !important;
    border: 0px !important;
    border-radius: 6px;
}

.fu-header {
    border: 0px !important;
    border-radius: 6px;
}

.fu {
    display: flex;
    flex-direction: column-reverse;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}


.img-profile {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    aspect-ratio: 1/1;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    margin-bottom: 0.3rem;
}
</style>

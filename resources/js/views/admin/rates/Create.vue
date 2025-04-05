<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Crear Valoracion</h6>

                    <Select v-model="rate.user_id" :options="users.data" filter optionLabel="name" optionValue="id"
                        dataKey="id" placeholder="Select a User" class="w-full md:w-56">
                    </Select>


                    <div class="form-group">
                        <Select v-model="rate.trip_id" :options="tripsList" filter
                            :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                            optionValue="id" dataKey="id" placeholder="Select a Start Point" class="w-full md:w-56" </Select>
                    </div>

                    <div class="form-group">
                        <label for="rates">Rate</label>
                        <InputNumber v-model="rate.rates" type="number" class="d-flex w-100 w-100" id="rates" :min="0"
                            :max="5" showButtons />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>

                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" @click="submitAddRate">Guardar</button>
    <Toast />
</template>
<script setup>
// VUE
import { ref, onMounted } from "vue";

// Composables
import useRates from "@/composables/rates";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";

const { createRate, rateSchema, rate } = useRates();
const { getUsers, users } = useUsers();
const { getTrips, tripsList } = useTrips();

onMounted(async () => {
    await getUsers();
    await getTrips();
});

const submitAddRate = async () => {
    createRate(rate);
    // await rateSchema.validate(rate, { abortEarly: false })
    //     .then(() => {
    //         createRate(rate);
    //     })
}
</script>

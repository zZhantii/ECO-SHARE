<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-2 text-primary">Crear Valoracion</h4>


                    <div class="form-group">
                        <label for="rate.user_id">Usuarios</label>
                        <Select v-model="rate.user_id" :options="users.data" filter optionLabel="name" optionValue="id"
                            dataKey="id" placeholder="Select a User" class="w-full md:w-56">
                        </Select>
                        <div v-if="validationErrors.user_id" class="text-danger mt-1">
                            <div v-for="message in validationErrors.user_id" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="rate.trip_id">Viajes</label>
                        <Select v-model="rate.trip_id" :options="tripsList" filter
                            :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                            optionValue="id" dataKey="id" placeholder="Select a Start Point" class="w-full md:w-56"
                            </Select>
                            <div v-if="validationErrors.trip_id" class="text-danger mt-1">
                                <div v-for="message in validationErrors.trip_id" :key="message">{{ message }}
                                </div>
                            </div>
                    </div>

                    <div class="form-group">
                        <label for="rates">Rate</label>
                        <InputNumber v-model="rate.rate" type="number" class="d-flex w-100 w-100" id="rates" :min="0"
                            :max="5" showButtons />
                        <div v-if="validationErrors.rate" class="text-danger mt-1">
                            <div v-for="message in validationErrors.rate" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary" @click="submitAddRate">Guardar</button>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
// VUE
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Composables
import useRates from "@/composables/rates";
import useUsers from "@/composables/users";
import useTrips from "@/composables/trips";

const { createRate, rateSchema, rate, validationErrors } = useRates();
const { getUsers, users } = useUsers();
const { getTrips, tripsList } = useTrips();

onMounted(async () => {
    await getUsers();
    await getTrips();
});

const submitAddRate = async () => {
    try {
        await rateSchema.validate(rate.value, { abortEarly: false })
            .then(() => {
                createRate(rate);
            }).then(() => {
                router.push({ name: "rate.index" });
            })
    } catch (error) {
        if (error.inner) {
            validationErrors.value = {}
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

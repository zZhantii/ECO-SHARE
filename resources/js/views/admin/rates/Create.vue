<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 border-round">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Crear Valoración</h2>
                        <span class="text-600 font-medium">Por favor, complete los datos del formulario</span>
                    </div>

                    <div class="mb-4">
                        <label for="rate.user_id" class="block text-900 font-medium mb-2">Usuario</label>
                        <Select v-model="rate.user_id" :options="users.data" filter optionLabel="name" optionValue="id"
                            dataKey="id" placeholder="Seleccionar Usuario" class="w-full"
                            :class="{ 'p-invalid': validationErrors.user_id }">
                        </Select>
                        <small v-if="validationErrors.user_id" class="p-error block mt-1">
                            <div v-for="message in validationErrors.user_id" :key="message">{{ message }}</div>
                        </small>
                    </div>

                    <div class="mb-4">
                        <label for="rate.trip_id" class="block text-900 font-medium mb-2">Viaje</label>
                        <Select v-model="rate.trip_id" :options="tripsList" filter
                            :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                            optionValue="id" dataKey="id" placeholder="Seleccionar Viaje" class="w-full"
                            :class="{ 'p-invalid': validationErrors.trip_id }">
                        </Select>
                        <small v-if="validationErrors.trip_id" class="p-error block mt-1">
                            <div v-for="message in validationErrors.trip_id" :key="message">{{ message }}</div>
                        </small>
                    </div>

                    <div class="mb-4">
                        <label for="rates" class="block text-900 font-medium mb-2">
                            Valoración
                            <i v-for="i in 5" :key="i" class="pi"
                                :class="{ 'pi-star-fill': i <= rate.rate, 'pi-star': i > rate.rate }"
                                style="color: #FFA41C; margin-left: 0.2rem;" @click="rate.rate = i" role="button">
                            </i>
                        </label>
                        <div class="p-inputgroup">
                            <InputNumber v-model="rate.rate" id="rates" :min="0" :max="5" showButtons :step="0.5"
                                placeholder="Ingrese una valoración" class="w-full"
                                :class="{ 'p-invalid': validationErrors.rate }">
                            </InputNumber>
                        </div>
                        <small v-if="validationErrors.rate" class="p-error block mt-1">
                            <div v-for="message in validationErrors.rate" :key="message">{{ message }}</div>
                        </small>
                    </div>

                    <div class="flex justify-content-end">
                        <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                        <Button label="Guardar" icon="pi pi-check" @click="submitAddRate" />
                    </div>
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
            })
        router.back();
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

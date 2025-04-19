<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 border-round">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Editar Valoración</h2>
                        <span class="text-600 font-medium">Modifique los datos del formulario</span>
                    </div>

                    <div v-if="rate && rate.pivot">
                        <div class="mb-4">
                            <label for="user_id" class="block text-900 font-medium mb-2">Usuario</label>
                            <Select v-model="rate.pivot.user_id" :options="users.data" filter optionLabel="name"
                                optionValue="id" dataKey="id" placeholder="Seleccionar Usuario" class="w-full"
                                :class="{ 'p-invalid': validationErrors.user_id }">
                            </Select>
                            <small v-if="validationErrors.user_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.user_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="trip_id" class="block text-900 font-medium mb-2">Viaje</label>
                            <Select v-model="rate.pivot.trip_id" :options="tripsList" filter
                                :optionLabel="option => `${option.start_point.address} - ${option.end_point.address}`"
                                optionValue="id" dataKey="id" placeholder="Seleccionar Viaje" class="w-full"
                                :class="{ 'p-invalid': validationErrors.trip_id }">
                            </Select>
                            <small v-if="validationErrors.trip_id" class="p-error block mt-1">
                                <div v-for="message in validationErrors.trip_id" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="mb-4">
                            <label for="rate" class="block text-900 font-medium mb-2">
                                Valoración
                                <i v-for="i in 5" :key="i" class="pi"
                                    :class="{ 'pi-star-fill': i <= rate.pivot.rate, 'pi-star': i > rate.pivot.rate }"
                                    style="color: #FFA41C; margin-left: 0.2rem;">
                                </i>
                            </label>
                            <div class="p-inputgroup">
                                <InputNumber v-model="rate.pivot.rate" id="rate" :min="0" :max="5" showButtons
                                    :step="0.5" placeholder="Ingrese una valoración" class="w-full"
                                    :class="{ 'p-invalid': validationErrors.rate }">
                                </InputNumber>
                            </div>
                            <small v-if="validationErrors.rate" class="p-error block mt-1">
                                <div v-for="message in validationErrors.rate" :key="message">{{ message }}</div>
                            </small>
                        </div>

                        <div class="flex justify-content-end">
                            <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                            <Button label="Actualizar" icon="pi pi-check" :loading="loading" class="p-button-success"
                                @click="submitUpdateRate" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const router = useRouter();
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
        await rateSchema.validate(rate.value.pivot, { abortEarly: false })
            .then(() => {
                updateRate(rate);
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

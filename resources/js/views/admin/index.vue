<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 cursor-pointer transition-colors transition-duration-500 hover:bg-primary-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Usuarios Totales</span>
                        <div class="text-900 font-medium text-xl">{{ stats.users?.total || 0 }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ stats.users?.new || 0 }} nuevos </span>
                <span class="text-500">esta semana</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 cursor-pointer transition-colors transition-duration-500 hover:bg-orange-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Vehículos</span>
                        <div class="text-900 font-medium text-xl">{{ stats.vehicles?.total || 0 }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-car text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ stats.vehicles?.validated || 0 }} validados</span>
                <span class="text-500">del total</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 cursor-pointer transition-colors transition-duration-500 hover:bg-cyan-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Viajes</span>
                        <div class="text-900 font-medium text-xl">{{ stats.trips?.total || 0 }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-map text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ stats.trips?.active || 0 }} activos</span>
                <span class="text-500">en este momento</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 cursor-pointer transition-colors transition-duration-500 hover:bg-purple-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Reservas</span>
                        <div class="text-900 font-medium text-xl">{{ stats.bookings?.total || 0 }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-ticket text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ stats.bookings?.confirmed || 0 }} confirmadas</span>
                <span class="text-500">esta semana</span>
            </div>
        </div>
    </div>
</template>

<script setup>
// composable
import useAdmin from "@/composables/admin";

const { getStats, stats } = useAdmin();

// Vue
import { onMounted, ref } from "vue";


onMounted( async () => {
    await getStats();
});

</script>

<style scoped>

</style>

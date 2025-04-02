// store/trip.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTripStore = defineStore('trip', () => {
    // 1. Define el estado con valor inicial
    const tripData = ref(null);

    // 2. Acción para actualizar datos
    const setTripData = (newData) => {
        tripData.value = { ...tripData.value, ...newData };
        console.log('Datos guardados en store:', tripData.value); // Verifica aquí
    };

    // 3. Acción para resetear (opcional)
    const clearTripData = () => {
        tripData.value = (null);
    };

    return { tripData, setTripData, clearTripData };
});
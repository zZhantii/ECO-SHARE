import axios from 'axios';
import { ref } from 'vue';

export default function useAdmin() {
    const stats = ref({
        users: { total: 0, new: 0 },
        vehicles: { total: 0, validated: 0 },
        trips: { total: 0, active: 0 },
        bookings: { total: 0, confirmed: 0 }
    });

    const isLoading = ref(false);
    const validationErrors = ref(null);

    const getStats = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = null;

        await axios.get('/api/admin/').
        then((response) => {
            console.log("Respuesta API mostrando estadísticas: ", response.data.data);
            stats.value = response.data.data;
        }).catch((error) => {
            swal({
                icon: "error",
                title: "Error",
                text: error.response.data.message
            });
        }).finally(() => (isLoading.value = false));
    };

    return {
        stats,
        isLoading,
        validationErrors,
        getStats
    };
}
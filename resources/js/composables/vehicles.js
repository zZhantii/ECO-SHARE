import { useToast } from "primevue";
import { ref, inject } from "vue";

export default function useVehicles(user) {
    const vehicle = ref({
        id: 0,
        plate: "",
        brand: "",
        model: "",
        consumption: 0.0,
        fuel_type: "",
        pax_number: 0,
        user_id: 0,
    });
    const vehiclesList = ref([]);
    const isLoading = ref(false);
    const swal = inject("$swal");
    const validationErrors = ref({});

    async function getVehicles() {
        if (vehiclesList.value.length > 0) return;
        axios.get("/api/vehicle/" + user.id).then((response) => {
            for (const e of response.data.data) {
                vehiclesList.value.push(e);
            }
        });
    }

    async function getVehicle(vehicleId) {
        if (isLoading.value || vehicle.value.length > 0) return;
        isLoading.value = true;

        try {
            const response = await axios.get("/api/vehicle/" + vehicleId);
            console.log("API Response:", response.data);
            vehicle.value = response.data;
            console.log("Vehiculo con ID cargado:", vehicle.value);
        } catch (error) {
            console.error("Error fetching trips:", error);
            useToast().add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los viajes',
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    }

    const updateVehicle = async (vehicle) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        console.log(vehicle.id);
        axios
            .put("/api/vehicle/" + vehicle.id, vehicle)
            .then((response) => {
                //router.push({name: 'users.index'})

                swal({
                    icon: "success",
                    title: "Vehicle updated successfully",
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteVehicle = async (vehicle) => {
        console.log("Comienza a borrar");
        console.log(vehicle.id);
        axios
            .delete("http://localhost:8000/api/vehicle/" + vehicle.id)
            .then((response) => { });
        console.log("Se acaba el borrar");
    };

    return {
        vehicle,
        vehiclesList,
        getVehicles,
        getVehicle,
        updateVehicle,
        validationErrors,
        deleteVehicle,
    };
}

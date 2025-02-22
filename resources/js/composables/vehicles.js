import { Toast } from "primevue";
import { ref, inject } from "vue";

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

export default function useVehicles() {
    async function getVehicles() {
        if (vehiclesList.value.length > 0) return;
        axios.get("/api/app/user-vehicle").then((response) => {
            console.log(response.data);
            for (const e of response.data.data) {
                vehiclesList.value.push(e);
            }
        });
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
            .then((response) => {});
        console.log("Se acaba el borrar");
    };

    return {
        vehicle,
        vehiclesList,
        getVehicles,
        updateVehicle,
        validationErrors,
        deleteVehicle,
    };
}

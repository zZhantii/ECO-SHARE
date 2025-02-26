import { Toast } from "primevue";
import { ref, inject } from "vue";

export default function useVehicles() {
    const vehicle = ref({
        id: 0,
        plate: "",
        brand: "",
        model: "",
        consumption: 0.0,
        fuel_type: "",
        pax_number: "",
        user_id: 0,
    });
    const vehiclesList = ref([]);
    const isLoading = ref(false);
    const swal = inject("$swal");
    const validationErrors = ref({});

    async function getVehicles() {
        if (vehiclesList.value.length > 0) return;
        axios.get("/api/app/user-vehicle").then((response) => {
            console.log(response.data);
            for (const e of response.data.data) {
                vehiclesList.value.push(e);
            }
        });
    }

    const addVehicle = async (vehicle) => {
        axios
            .post("/api/vehicle/", vehicle.value)
            .then((response) => {
                vehiclesList.value.push(vehicle.value);
                swal({
                    icon: "success",
                    title: "Vehículo guardado satisfactoriamente",
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
                console.log("paatata");
            })
            .finally(() => (isLoading.value = false));
    };

    const updateVehicle = async (vehicle) => {
        if (isLoading.value) return;
        console.log("patata");
        console.log(vehicle);
        console.log("patata");
        isLoading.value = true;
        validationErrors.value = {};

        axios
            .put("/api/vehicle/" + vehicle.id, vehicle)
            .then((response) => {
                swal({
                    icon: "success",
                    title: "Vehicle actualizado con éxito",
                });
                const index = vehiclesList.value.findIndex(
                    (v) => v.id == vehicle.id
                );

                vehiclesList.value[index] = vehicle;
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteVehicle = async (vehicle) => {
        axios
            .delete("/api/vehicle/" + vehicle.id)
            .then((response) => {
                const index = vehiclesList.value.findIndex(
                    (v) => v.id == vehicle.id
                );

                vehiclesList.value.splice(index, 1);
                swal({
                    icon: "success",
                    title: "Vehículo eliminado con éxito",
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            });
    };

    return {
        vehicle,
        vehiclesList,
        getVehicles,
        updateVehicle,
        validationErrors,
        deleteVehicle,
        addVehicle,
    };
}

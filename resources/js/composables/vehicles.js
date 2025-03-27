import { useToast } from "primevue";
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

    // const getVehicles = async () => {
    //     try {
    //         const response = await axios.get("/api/app/user-vehicles");
    //         vehiclesList.value = response.data.data;
    //         console.log("API response, vehiculos cargados: " + vehiclesList.value);
    //     } catch (error) {
    //         validationErrors.value = error.response.data.errors;
    //     }
    // }

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
            })
            .finally(() => (isLoading.value = false));
    };

    // const getVehicle = async (vehicleID) => {
    //     try {
    //         const response = await axios.get("/api/vehicle/" + vehicleID);
    //         vehicle.value = response.data.data;
    //         console.log("API response, vehiculo cargado: " + vehicle.value + " con ID: " + vehicleID);
    //     } catch (error) {
    //         validationErrors.value = error.response.data.errors;
    //     }        
    // }

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
        console.log("patata");
        console.log(vehicle);
        console.log("patata2");
        isLoading.value = true;
        validationErrors.value = {};

        axios
            .put("/api/vehicle/" + vehicle.id, vehicle)
            .then((response) => {
                const index = vehiclesList.value.findIndex(
                    (v) => v.id == vehicle.id
                );
                // Esta comprobación mira si la propiedad user_id es nula, lo que significaría una petición para borrar
                // el vehículo desde el perfil, aunque estaríamos actualizando el campu user_id a null para no perder
                // los registros del vehículo

                if (vehicle.user_id) {
                    swal({
                        icon: "success",
                        title: "Vehicle actualizado con éxito",
                    });
                    vehiclesList.value[index] = vehicle;
                } else {
                    swal({
                        icon: "success",
                        title: "Vehículo eliminado con éxito",
                    });
                    vehiclesList.value.splice(index, 1);
                }
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
        getVehicle,
        updateVehicle,
        validationErrors,
        deleteVehicle,
        addVehicle,
    };
}

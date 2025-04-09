import { text } from "@fortawesome/fontawesome-svg-core";
import { useToast } from "primevue";
import { ref, inject } from "vue";
import * as yup from "yup";
import { es } from "yup-locales";

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

    yup.setLocale(es);
    const vehicleSchema = yup.object().shape({
        plate: yup.string().matches(/^[A-Z0-9-]+$/, "Formato de matrícula inválido, debe de ser 1234ABC").required("La matrícula es obligatoria"),
        brand: yup.string().required("La marca es obligatoria"),
        model: yup.string().required("El modelo es obligatorio"),
        consumption: yup.number().positive("El consumo debe ser un número positivo").required("El consumo es obligatorio"),
        pax_number: yup.number().integer("Debe ser un número entero").positive("Debe ser un número positivo").required("El número de pasajeros es obligatorio"),
        validation: yup.number().required("La validación es obligatoria").default(0),
        fuel_type: yup.string().oneOf(["Gasolina", "Diésel"], "Tipo de combustible inválido").required("El tipo de combustible es obligatorio"),
    });

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

    const createVehicle = async (vehicle2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios
            .post("/api/vehicle/", vehicle2.value)
            .then((response) => {
            console.log("Respuesta API creando vehículo: ", response.data.message);
                swal({
                    icon: "success",
                    title: "Vehículo guardado satisfactoriamente",
                        text: response.data.message,
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    }

    const getVehicle = async (vehicleId) => {
        if (isLoading.value || vehicle.value.length > 0) return;
        isLoading.value = true;

        try {
            const response = await axios.get("/api/vehicle/" + vehicleId);
            console.log("API Response:", response.data.data);
            vehicle.value = response.data.data;
            console.log("Vehiculo con ID cargado:", vehicle.value);
        } catch (error) {
            console.error("Error fetching trips:", error);
            useToast().add({
                severity: "error",
                summary: "Error",
                detail: "No se pudieron cargar los viajes",
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

        axios.put("/api/vehicle/" + vehicle.id, vehicle)
            .then((response) => {
                console.log("Respuesta API actualizando vehículo: ", response.data.message)

                // Volver reactividad
                const index = vehiclesList.value.findIndex((v) => v.id == vehicle.id);
                vehiclesList.value[index] = vehicle;

                swal({
                    icon: "success",
                    title: "Vehicle actualizado con éxito",
                    text: response.data.message,
                });
            }).catch((error) => {
                console.log("Error actualizando el vehículo:", error);
            }).finally(() => isLoading.value = false);
    };

    const deleteVehicle = async (vehicle) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/vehicle/" + vehicle.id)
            .then((response) => {
                console.log("Respuesta API actualizando vehículo: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Vehicle actualizado con éxito",
                    text: response.data.message,
                });
            }).catch((error) => {
                console.log("Error actualizando el vehículo:", error);
            }).finally(() => isLoading.value = false);
    };

    return {
        vehicle,
        vehiclesList,
        vehicleSchema,
        validationErrors,
        getVehicles,
        getVehicle,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        addVehicle,
    };
}

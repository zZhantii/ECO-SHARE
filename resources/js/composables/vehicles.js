import { useToast } from "primevue";
import { ref, inject } from "vue";
import * as yup from "yup";
import { es } from "yup-locales";
import { useRouter } from "vue-router";

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
        validation: 0,
    });
    // Array reactivo para la gestión de vehículos
    const vehiclesList = ref([]);

    const vehicleSchema = yup.object().shape({
        plate: yup
            .string()
            .matches(
                /^[A-Z0-9-]+$/,
                "Formato de matrícula inválido, debe de ser 1234ABC"
            )
            .required("La matrícula es obligatoria"),
        brand: yup.string().required("La marca es obligatoria"),
        model: yup.string().required("El modelo es obligatorio"),
        consumption: yup
            .number()
            .positive("El consumo debe ser un número positivo")
            .required("El consumo es obligatorio"),
        pax_number: yup
            .number()
            .integer("Debe ser un número entero")
            .positive("Debe ser un número positivo")
            .required("El número de pasajeros es obligatorio"),
        validation: yup
            .number()
            .required("La validación es obligatoria")
            .default(0),
        fuel_type: yup
            .string()
            .oneOf(["Gasolina", "Diésel"], "Tipo de combustible inválido")
            .required("El tipo de combustible es obligatorio"),
    });

    yup.setLocale(es);
    const isLoading = ref(false);
    const swal = inject("$swal");
    const validationErrors = ref({});
    const router = useRouter();

    // Método que consigue todos los vehículos de la API
    const getVehiclesAdmin = async () => {
        if (vehiclesList.value.length > 0) return;
        axios.get("/api/vehicle/").then((response) => {
            console.log(response.data);
            for (const e of response.data.data) {
                vehiclesList.value.push(e);
            }
        });
    };

    // Método que consigue todos los vehículos de la API
    const getVehicles = async () => {
        if (vehiclesList.value.length > 0) return;
        axios.get("/api/app/user-vehicle").then((response) => {
            console.log(response.data);
            for (const e of response.data.data) {
                vehiclesList.value.push(e);
            }
        });
    };

    // Método API para añadir un vehículo de un usuario con los datos de un objeto vehicle
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

    const createVehicle = async (vehicle) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios
            .post("/api/vehicle/", vehicle.value)
            .then((response) => {
                console.log(
                    "Respuesta API creando vehículo: ",
                    response.data.message
                );
                vehiclesList.value.push(vehicle.value);
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
    };

    // Método API para conseguir un vehículo con sus datos de un usuario a partir del id del vehículo
    const getVehicle = async (vehicleId) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        await axios
            .get("/api/vehicle/" + vehicleId)
            .then((response) => {
                console.log(
                    "Respuesta API obteniendo vehículo: ",
                    response.data.data
                );
                vehicle.value = response.data.data;
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    // Método API para actualizar los datos de un vehículo a partir de un objeto vehicle
    const updateVehicle = async (vehicle) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        await axios
            .put("/api/vehicle/" + vehicle.value.id, vehicle.value)
            .then((response) => {
                // Volver reactividad
                const index = vehiclesList.value.findIndex(
                    (v) => v.id == vehicle.id
                );
                vehiclesList.value[index] = vehicle;

                swal({
                    icon: "success",
                    title: "Vehicle actualizado con éxito",
                    text: response.data.message,
                });
            })
            .catch((error) => {
                console.log("Error actualizando el vehículo:", error);
            })
            .finally(() => (isLoading.value = false));
    };

    // Método API que elimina un vehículo a partir de los daos del vehículo activo
    const deleteVehicle = async (vehicle) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        swal({
            title: "Estás seguro?",
            text: "Esta acción no se puede revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#ef4444",
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("/api/vehicle/" + vehicle.id)
                    .then((response) => {
                        console.log(
                            "Respuesta API actualizando vehículo: ",
                            response.data.message
                        );
                        const index = vehiclesList.value.findIndex(
                            (trip) => trip.id == vehicle.id
                        );
                        vehiclesList.value.splice(index, 1);

                        router.push({ name: "vehicles.index" });
                        swal({
                            icon: "success",
                            title: "Vehicle actualizado con éxito",
                            text: response.data.message,
                        });
                    })
                    .catch((error) => {
                        console.log("Error actualizando el vehículo:", error);
                    })
                    .finally(() => (isLoading.value = false));
            }
        });
    };

    return {
        vehicle,
        vehiclesList,
        vehicleSchema,
        validationErrors,
        isLoading,
        getVehicles,
        getVehiclesAdmin,
        getVehicle,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        addVehicle,
    };
}

import axios from "axios";
import { ref, inject } from "vue";
import * as yup from "yup";
import { es } from "yup-locales";

export default function useRates() {
    const rate = ref({
        user_id: 0,
        trip_id: 0,
        rate: null
    });
    const rateList = ref([]);
    const isLoading = ref(false);
    const swal = inject("$swal");
    yup.setLocale(es);
    const validationErrors = ref({});
    const rateSchema = yup.object().shape({
        user_id: yup.number()
            .required("El usuario es requerido")
            .positive("El ID del usuario debe ser positivo")
            .integer("El ID del usuario debe ser un número entero"),
        trip_id: yup.number()
            .required("El viaje es requerido")
            .positive("El ID del viaje debe ser positivo")
            .integer("El ID del viaje debe ser un número entero"),
        rate: yup.number()
            .required("La valoración es requerida")
            .min(1, "La valoración debe ser entre 1 y 5")
            .max(5, "La valoración debe ser entre 1 y 5")
            .integer("La valoración debe ser un número entero")
    });

    const getRates = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/rates/").then((response) => {
            console.log("Respuesta API mostrar valoraciones: ", response.data.data);
            rateList.value = response.data.data; 
        }).catch(() => { 
            swal({
                icon: "error",
                title: "Error",
                text: "Error al cargar las valoraciones"
            });
        }).finally(() => (isLoading.value = false));
    };

    const getRateWithId = async (user_id, trip_id) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/rates/" + user_id + "/" + trip_id)
            .then((response) => {
                console.log("Respuesta API obtener valoración: ", response.data.data);
                rate.value = response.data.data;
            }).catch((error) => {
                if (error.response?.status === 404) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                } else if (error.response?.status === 422) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                } else if (error.response?.status === 500) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                }
                
                console.error("Error:", error);
            }).finally(() => isLoading.value = false);
    }

    const createRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.post("/api/rates/", rate2.value)
            .then((response) => {
                console.log("Respuesta API crear valoración: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Éxito",
                    text: "Valoración creada correctamente"
                });
            }).catch((error) => {
                if (error.response?.status === 422) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                } else if (error.response?.status === 404) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                } else if (error.response?.status === 500) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                }
            }).finally(() => isLoading.value = false);
    }

    const updateRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.put("/api/rates/" + rate2.value.pivot.user_id + "/" + rate2.value.pivot.trip_id, rate2.value.pivot)
            .then((response) => {
                console.log("Respuesta API actualizar: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Éxito",
                    text: "Valoración actualizada correctamente"
                });
            }).catch((error) => { {
                if (error.response?.status === 500) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "Error al actualizar la valoración"
                    });
                }
            }
            }).finally(() => isLoading.value = false);
    };

    const deleteRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/rates/" + rate2.user_id + "/" + rate2.trip_id)
            .then((response) => {
                console.log("Respuesta API eliminar: ", response.data.message);
                swal({
                    icon: "success",
                    title: "Éxito",
                    text: "Valoración eliminada correctamente"
                });
            }).catch((error) => {
                if (error.response?.status === 404) {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "Valoración no encontrada"
                    });
                } else {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "Error al eliminar la valoración"
                    });
                }
                console.error("Error:", error);
            }).finally(() => isLoading.value = false);
    };
    

    return {
        getRates,
        createRate,
        getRateWithId,
        updateRate,
        deleteRate,
        rateList,
        rate,
        rateSchema,
        isLoading,
        validationErrors
    }
}

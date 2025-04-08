import axios from 'axios';
import { ref, inject } from 'vue';
import { RouterLink } from 'vue-router';
import * as yup from "yup";
import { es } from "yup-locales";

export default function useReserves() {
    const reserveList = ref([]);
    const reserve = ref({
        user_id: 0,
        trip_id: 0,
        seats_reserved: null,
        reservation_date: null,
        check_in: null
    })
    const isLoading = ref(false);
    const swal = inject("$swal");
    yup.setLocale(es);
    const validationErrors = ref({});

    const reserveSchema = yup.object().shape({
        user_id: yup.number()
            .required("El campo usuario es requerido")
            .positive("El ID del usuario debe ser un número positivo")
            .integer("El ID del usuario debe ser un número entero"),
        trip_id: yup.number()
            .required("El campo viaje es requerido")
            .positive("El ID del viaje debe ser un número positivo")
            .integer("El ID del viaje debe ser un número entero"),
        seats_reserved: yup.number()
            .required("El campo asientos es requerido")
            .positive("El número de asientos reservados debe ser mayor que 0")
            .integer("El número de asientos debe ser un número entero"),
        reservation_date: yup.date()
            .required("La fecha de reserva es requerida")
            .min(new Date(), "La fecha de reserva no puede ser en el pasado"),
        check_in: yup.date()
            .nullable(),
        total_price: yup.number()
            .required("El precio total es requerido")
            .positive("El precio total debe ser mayor que 0")
            .min(0.01, "El precio total debe ser mayor que 0,01")
    });

    const getReserves = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/reserves/").then((response) => {
            console.log("Respuesta API show reserves: ", response.data.data);
            reserveList.value = response.data.data;
        }).catch((error) => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
                console.log(validationErrors.value);
            }
        }).finally(() => (isLoading.value = false));
    };

    const getReserveWithId = async (user_id, trip_id) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/reserves/" + user_id + "/" + trip_id)
            .then((response) => {
                console.log("Respuesta API get: ", response.data.data);
                reserve.value = response.data.data;
            }).catch((error) => {
                console.error("Error creando la reserva:", error);

                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            if (error.response.data.message) {
                                swal({
                                    icon: "error",
                                    title: "Error",
                                    text: error.response.data.message
                                });
                            }
                            break;
                        default:
                            swal({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un error al crear la reserva"
                            });
                    }
                }
            }).finally(() => isLoading.value = false);
    }

    const createReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        reserve2.value.reservation_date = formatDateTime(reserve2.value.reservation_date);
        reserve2.value.check_in = reserve2.value.check_in ? formatDateTime(reserve2.value.check_in) : null;
        axios.post("/api/reserves/", reserve2.value)
            .then((response) => {
                console.log("Respuesta API create trip: ", response.data.message);
                swal({
                    icon: "success",
                    title: "Reserva creada correctamente",
                    text: response.data.message
                });
            }).catch((error) => {
                console.error("Error creando la reserva:", error);

                if (error.response) {
                    switch (error.response.status) {
                        case 422: 
                            if (error.response.data.message) {
                                swal({
                                    icon: "error",
                                    title: "Error",
                                    text: error.response.data.message
                                });
                            }
                            break;
                        case 404:
                            swal({
                                icon: "error",
                                title: "Error",
                                text: error.response.data.message || "Usuario o viaje no encontrado"
                            });
                            break;
                        default:
                            swal({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un error al crear la reserva"
                            });
                    }
                } else {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "Error de conexión. Por favor, inténtelo de nuevo"
                    });
                }
            }).finally(() => isLoading.value = false);
    };

    function formatDateTime(dateInput) {
        if (!dateInput) return null;
        return new Date(dateInput).toISOString().replace('T', ' ').slice(0, 19);
    }

    const updateReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        reserve2.value.pivot.reservation_date = formatDateTime(reserve2.value.pivot.reservation_date);
        reserve2.value.pivot.check_in = formatDateTime(reserve2.value.pivot.check_in);

        axios.put("/api/reserves/" + reserve2.value.pivot.user_id + "/" + reserve2.value.pivot.trip_id, reserve2.value.pivot)
            .then((response) => {
                console.log("Respuesta API update: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Reserva actualizada correctamente",
                });

            }).catch((error) => {
                console.error("Error creando la reserva:", error);

                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            if (error.response.data.message) {
                                swal({
                                    icon: "error",
                                    title: "Error",
                                    text: error.response.data.message
                                });
                            }
                            break;
                        default:
                            swal({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un error al crear la reserva"
                            });
                    }
                }
            }).finally(() => isLoading.value = false);
    };

    const deleteReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/reserves/" + reserve2.user_id + "/" + reserve2.trip_id)
            .then((response) => {
                console.log("Respuesta API delete: ", response.data.message);
                swal({
                    icon: "success",
                    title: "Reserva eliminada Correctamente",
                });
            }).catch((error) => {
                console.error("Error creando la reserva:", error);

                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            if (error.response.data.message) {
                                swal({
                                    icon: "error",
                                    title: "Error",
                                    text: error.response.data.message
                                });
                            }
                            break;
                        default:
                            swal({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un error al crear la reserva"
                            });
                        }
                    }
            }).finally(() => isLoading.value = false);
    };

    return {
        reserveList,
        reserve,
        reserveSchema,
        validationErrors,
        isLoading,
        getReserves,
        getReserveWithId,
        createReserve,
        updateReserve,
        deleteReserve,
    };
}
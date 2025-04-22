import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, inject } from "vue";
import { tr } from "yup-locales";
import * as yup from "yup";
import { es } from "yup-locales";

export default function useTrips() {
    const tripsList = ref([]);
    const trip = ref({
        user_id: 0,
        vehicle_id: 0,
        start_point: null,
        end_point: null,
        available_seats: null,
        price: null,
        departure_time: null,
        arrival_time: null,
        drive_start: null,
        drive_end: null,
    });
    const tripList = ref([]);
    const tags = ref([]);
    const searchTripList = ref([]);
    const reservesList = ref([]);
    const toast = useToast();
    const isLoading = ref(false);
    const validationErrors = ref([]);

    // Arrays reactivos para los viajes del histórico como pasajeros o conductor
    const driverHistory = ref([]);
    const passengerHistory = ref([]);

    // Array reactivo con los viajes a puntuar
    const tripsToRate = ref([]);

    const swal = inject("$swal");
    yup.setLocale(es);

    // Arrays reactivos para llos viajes activos como pasajeros o conductor
    const activeDriverTripsList = ref([]);
    const activePassengerTripsList = ref([]);

    const startpointDefault = {
        address: "",
        locality: "",
        location: { latitude: 0.0, longitude: 0.0 },
    };
    const endpointDefault = {
        address: "",
        locality: "",
        location: { latitude: 0.0, longitude: 0.0 },
    };

    const TripSchema = yup.object().shape({
        user_id: yup
            .number()
            .integer("El User ID debe ser un número entero")
            .required("El User ID es obligatorio"),
        vehicle_id: yup
            .number()
            .integer("El Vehicle ID debe ser un número entero")
            .required("El Vehicle ID es obligatorio"),
        start_point: yup.mixed().default(startpointDefault).nullable(true),
        end_point: yup.mixed().default(endpointDefault).nullable(true),
        departure_time: yup.date().required("La hora de salida es obligatoria"),
        arrival_time: yup.date().required("La hora de llegada es obligatoria"),
        available_seats: yup
            .number()
            .integer("Debe ser un número entero")
            .min(1, "Debe haber al menos un asiento disponible")
            .required("El número de asientos es obligatorio"),
        price: yup
            .number()
            .typeError("El precio debe ser un número válido")
            .positive("El precio debe ser mayor que 0")
            .nullable(false)
            .required("El precio es obligatorio"),
        drive_start: yup.date().nullable(true),
        drive_end: yup.date().nullable(true),
    });

    // const getTrips = async () => {
    //     try {
    //         const response = await axios.get("api/trip");
    //         trips.value = response.data.data;
    //         console.log("API response, viajes cargados: " + trips.value);
    //     } catch (error) {
    //         console.log("Error fetching: ", error);
    //     }
    // }

    // Método API para el registro de un viaje
    const postTrips = async (trip) => {
        // trip.value.user_id = userId.value;

        try {
            const response = await axios.post("/api/trip", trip);
            swal({
                icon: "success",
                title: "Viaje registrado con éxito",
            });
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            swal({
                icon: "error",
                title: "No se ha podido registrar la publicación",
            });
        }
    };

    // Método API para la carga de todos los viajes
    async function getTrips() {
        if (isLoading.value || tripsList.value.length > 0) return;
        isLoading.value = true;

        try {
            const response = await axios.get("/api/trip");
            console.log("API Response:", response.data);
            tripsList.value = response.data.data;

            console.log("Trips cargados:", tripsList.value);
        } catch (error) {
            console.error("Error fetching trips:", error);
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "No se pudieron cargar los viajes",

                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    }

    // const getTrip = async (tripID) => {
    //     try {
    //         const response = await axios.get("/api/trip" + tripID);
    //         trip.value = response.data.data;
    //         console.log("API response, trip cargado: " + trip.value + "Con ID: " + tripID);
    //     } catch (error) {
    //         console.log("Error fetching: ", error);
    //     }
    // }

    // Méodo API para conseguir un viaje concreto a partir de su d
    async function getTrip(tripId) {
        if (isLoading.value || trip.value.length > 0) return;
        isLoading.value = true;

        try {
            console.log("Cargando trip con ID:", tripId);
            const response = await axios.get("/api/trip/" + tripId);
            trip.value = response.data.data;
            console.log("Trip con ID cargado:", trip.value);
        } catch (error) {
            console.error("Error fetching trips:", error);
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "No se pudieron cargar los viajes",
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    }

    const searchTrip = async (searchParams) => {
        try {
            console.log("searchparams", searchParams);
            const response = await axios.get("/api/trips/search", {
                params: searchParams,
            });

            console.log("API response: ", response.data.data);
            searchTripList.value = response.data.data;
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    // const updateTrip = async (tripID, trip) => {
    //     try {
    //         const response = await axios.put("/api/trip" + tripID, trip);
    //         const index = trips.value.findIndex((ID) => ID.id === trip.id);
    //         if (index !== -1) {
    //             trips.value[index] = trip;
    //         }
    //     } catch (error) {
    //         console.log("Error updating: ", error);
    //     }
    // }

    const updateTrip = async (trip) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        try {
            const response = await axios.put("/api/trip/" + trip.id, trip);
            console.log(
                "API response, Trip actualizado: ",
                response.data.message
            );
            const index = tripsList.value.findIndex((t) => t.id === trip.id);
            if (index !== -1) {
                tripsList.value[index] = trip;
            }

            toast.add({
                severity: "success",
                summary: "Éxito",
                detail: "Viaje actualizado correctamente",
                life: 3000,
            });
        } catch (error) {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
            }
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "No se pudo actualizar el viaje",
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    };

    // Método API  para conseguir todos los viajes activos del usuario autenticado
    const getActiveTrips = async () => {
        const responseDriver = await axios.get("/api/app/driver-active-trip");

        // Recepción de los viajes activos como conductor
        if (responseDriver.data.data) {
            for (const element of responseDriver.data.data) {
                activeDriverTripsList.value.push(element);
            }
        }
        const responsePassenger = await axios.get(
            "/api/app/passenger-active-trip"
        );

        // Recepción de los viajes activos como pasajero
        if (responsePassenger.data.data) {
            for (const element of responsePassenger.data.data) {
                activePassengerTripsList.value.push(element);
            }
        }
    };

    // Método que marca el inicio del viaje como conductor con el id del viaje
    const startDrive = async (tripId) => {
        try {
            const response = await axios.put(`/api/app/start-drive/${tripId}`);
            console.log("API: ", response.data);

            swal({
                icon: "success",
                title: "Viaje iniciado",
            });
            const index = activeDriverTripsList.value.findIndex(
                (e) => e.id == tripId
            );

            activeDriverTripsList.value[index].drive_start =
                response.data.data.drive_start;
        } catch (e) {
            swal({
                icon: "error",
                title: "No se ha podido iniciar el viaje",
                text: e.response.data.data,
            });
            console.log("error", e);
        }
    };

    // Método que marca el final del viaje como conductor con el id del viaje
    const endDrive = async (tripId) => {
        try {
            const response = await axios.put(`/api/app/end-drive/${tripId}`);

            if (response.data.success == true) {
                swal({
                    icon: "success",
                    title: "Viaje finalizado",
                });
                const index = activeDriverTripsList.value.findIndex(
                    (e) => e.id == tripId
                );

                activeDriverTripsList.value[index].drive_end =
                    response.data.data.drive_end;
            } else {
                swal({
                    icon: "error",
                    title: "No se ha podido finalizar el viaje",
                });
            }
        } catch (e) {
            swal({
                icon: "error",
                title: "Error inesperado en el servidor",
            });
        }
    };

    // Método que marca el checkin del pasajero a partir del id del viaje
    const makeCheckIn = async (trip) => {
        axios
            .put("/api/app/check-in", trip)
            .then((response) => {
                console.log("API response: ", trip);

                swal({
                    icon: "success",
                    title: "Check-in realizado",
                });
                const index = activePassengerTripsList.value.findIndex(
                    (e) => e.id == trip.id
                );

                activePassengerTripsList.value[index] = response.data.data;
            })
            .catch((e) => {
                console.log(e);
                swal({
                    icon: "error",
                    title: "No se ha podido registrar la acción.",
                    text: e.response.data.data,
                });
            });
    };

    //  Método API para cancelar el viaje como conductor con el id del viaje
    const cancellTripAsDriver = async (tripId) => {
        try {
            const response = await axios.put(
                `/api/app/cancel-driver-trip/${tripId}`
            );

            if (response.data.success == true) {
                swal({
                    icon: "success",
                    title: "Viaje cancelado",
                });
                const index = activeDriverTripsList.value.findIndex(
                    (e) => e.id == tripId
                );

                activeDriverTripsList.value[index].cancelled_at =
                    response.data.data.cancelled_at;
            } else {
                swal({
                    icon: "error",
                    title: "No se ha podido cancelar el viaje",
                });
            }
        } catch (e) {
            swal({
                icon: "error",
                title: "Error inesperado en el servidor",
            });
        }
    };

    // const deleteTrip = async (tripID) => {
    //     try {
    //         const response = await axios.delete("/api/trip" + tripID);
    //         tripsList.value = tripsList.value.findIndex((ID) => ID.id === tripID)
    //         console.log("API response, trip con ID: " + tripID + " eliminado.")
    //     } catch (error) {
    //         console.log("Error updating: ", error);
    //     }
    // }

    // Formateador de fecha
    function formatDateTime(dateInput) {
        if (!dateInput) return null;
        return new Date(dateInput).toISOString().replace("T", " ").slice(0, 19);
    }

    const createTrip = async (trip2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        trip2.value.departure_time = formatDateTime(trip2.value.departure_time);
        trip2.value.arrival_time = formatDateTime(trip2.value.arrival_time);

        if (trip2.value.start_point === null) {
            trip2.value.start_point = startpointDefault;
        }

        if (trip2.value.end_point === null) {
            trip2.value.end_point = endpointDefault;
        }

        axios
            .post("/api/trip/", trip2.value)
            .then((response) => {
                console.log(
                    "Respuesta API creando viaje",
                    response.data.message
                );
                swal({
                    icon: "success",
                    title: "Viaje creado correctamente",
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

    const deleteTrip = async (trip) => {
        if (isLoading.value) return;

        isLoading.value = true;

        try {
            await axios.delete("/api/trip/" + trip.id);
            // Eliminar el viaje de la lista
            tripsList.value = tripsList.value.find((t) => t.id !== trip.id);
            toast.add({
                severity: "success",
                summary: "Éxito",
                detail: "Viaje eliminado correctamente",
                life: 3000,
            });
        } catch (error) {
            console.error("Error deleting trip:", error);
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "No se pudo eliminar el viaje",
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    };

    // const addUnavailable_seat = async (unavailable_seats, tripID) => {
    //     try {
    //         const response = await axios.put("/api/trip/" + tripID, {
    //             unavailable_seats: unavailable_seats
    //         });

    //         const tripArray = Object.values(tripList);

    //         const index = tripArray.findIndex((ID) => ID.id === tripID);
    //         if (index !== -1) {
    //             tripsList.value[index] = trip;
    //         }
    //         console.log("API response, Trip actualizado: " + response.data.data);
    //     } catch (error) {
    //         console.log("Error updating: ", error);
    //     }
    // }

    const reservedTrip = async (trip2) => {
        try {

            // console.log("composable", trip2.value.trip_id);

            const response = await axios.post("/api/trip/reserve/" + trip2.value.trip_id, trip2.value            );
            console.log("API response, Trip reservado: " + response.data.data);
            swal({
                icon: "success",
                title: "Reserva creada correctamente",
                text: response.data.message
            });
        } catch (error) {
            console.log("Error updating: ", error);
        }
    };

    //  Método API para cancelar el viaje como conductor con el id del viaje
    const cancellTripAsPassenger = async (tripId) => {
        try {
            const response = await axios.put(
                `/api/app/cancel-passenger-trip/${tripId}`
            );

            if (response.data.success == true) {
                swal({
                    icon: "success",
                    title: "Viaje cancelado",
                });
                const index = activePassengerTripsList.value.findIndex(
                    (e) => e.id == tripId
                );

                activePassengerTripsList.value[index].cancelled_at =
                    response.data.data.pivot.cancelled_at;
            } else {
                swal({
                    icon: "error",
                    title: "No se ha podido cancelar el viaje",
                });
            }
        } catch (e) {
            swal({
                icon: "error",
                title: "Error inesperado en el servidor",
            });
        }
    };

    const getReserves = () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios
            .get("/api/reserva/")
            .then((response) => {
                // console.log("api");
                console.log("API response: ", response.data);
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            })
            .finally(() => (isLoading.value = false));
    };

    // Método API que consigue todos los viajes históricos del conductor
    const getDriverHistory = async () => {
        axios.get("/api/app/driver-history").then((response) => {
            const trips = response.data.data;
            for (const element of trips) {
                driverHistory.value.push(element);
            }
        });
    };
    // Método API que consigue todos los viajes históricos del pasajero
    const getPassengerHistory = async () => {
        return axios.get("/api/app/passenger-history").then((response) => {
            const trips = response.data.data;
            for (const element of trips) {
                passengerHistory.value.push(element);
            }

            getTripsToRate(passengerHistory.value);

            if (tripsToRate.value.length > 0) {
                return true;
            }
            return false;
        });
    };

    // Método API que consigue todos los viajes del pasajero pendientes de puntuar. Recibe un array con todos los viajes pendientes
    const getTripsToRate = (passengerHistory) => {
        for (const trip of passengerHistory) {
            // En cada viaje se comprueba el campo de las puntuaciones y simplifica los datos dentro del array tripToRate
            // para su gfestión más cómoda
            if (trip.rates.length == 0) {
                tripsToRate.value.push(trip);
            }
        }
    };

    // Método para la puntuación del viaje como usuario que recibe el viaje a puntuar, el array para establecer los cambios
    //  y el emit para emitir esto entre componentes
    const rateTrip = async (trip, localTrips, emit) => {
        axios
            .post("/api/rates", {
                user_id: trip.user.id,
                trip_id: trip.pivot.trip_id,
                rate: trip.rate,
            })
            .then((response) => {
                const index = localTrips.value.findIndex(
                    (t) => t.id == trip.id
                );
                if (index !== -1) {
                    localTrips.value.splice(index, 1);
                    emit("update:tripsToRate", localTrips.value);
                }
                swal({
                    icon: "success",
                    title: "Valoración registrada con éxito",
                });
            })
            .catch((error) => {
                swal({
                    icon: "error",
                    title: "No se ha podido registrar la valoración",
                    text: error.response.data.message,
                });
                console.log("ERROR", error);
            });
    };
    const getTagTrips = async (trip_id) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        await axios
            .get("/api/tags/" + trip_id)
            .then((response) => {
                console.log(
                    "Respuesta API recogiendo todas las etiquetas: ",
                    response.data.data
                );
                tags.value = response.data.data;
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            })
            .finally(() => (isLoading.value = false));
    };

    return {
        // trips,
        trip,
        tripsList,
        tripList,
        searchTripList,
        TripSchema,
        tags,
        getTagTrips,
        getTrips,
        getReserves,
        reservesList,
        getTrip,
        updateTrip,
        deleteTrip,
        makeCheckIn,
        getDriverHistory,
        getPassengerHistory,
        driverHistory,
        passengerHistory,
        // addUnavailable_seat,
        reservedTrip,
        searchTrip,
        validationErrors,
        getActiveTrips,
        activeDriverTripsList,
        startDrive,
        endDrive,
        activePassengerTripsList,
        cancellTripAsDriver,
        cancellTripAsPassenger,
        createTrip,
        postTrips,
        rateTrip,
        tripsToRate,
    };
}

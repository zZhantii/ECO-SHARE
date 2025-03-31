import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, inject } from "vue";

export default function useTrips(user) {
    const tripsList = ref([]);
    // const trips = ref({});
    const tripList = ref([]);
    // const trip = ref({});
    const searchTripList = ref([]);

    const isLoading = ref(false);
    const validationErrors = ref([]);

    const activeDriverTripsList = ref([]);

    const toast = useToast();

    // const getTrips = async () => {
    //     try {
    //         const response = await axios.get("api/trip");
    //         trips.value = response.data.data;
    //         console.log("API response, viajes cargados: " + trips.value);
    //     } catch (error) {
    //         console.log("Error fetching: ", error);
    //     }
    // }

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

    // const getTrip = async (tripID) => {
    //     try {
    //         const response = await axios.get("/api/trip" + tripID);
    //         trip.value = response.data.data;
    //         console.log("API response, trip cargado: " + trip.value + "Con ID: " + tripID);
    //     } catch (error) {
    //         console.log("Error fetching: ", error);
    //     }
    // }
    
    async function getTrip(tripId) {
        if (isLoading.value || tripList.value.length > 0) return;
        isLoading.value = true;

        try {
            console.log("Cargando trip con ID:", tripId);
            const response = await axios.get("/api/trip/" + tripId);
            tripList.value = response.data.data;
            console.log("Trip con ID cargado:", tripList.value);
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

    const searchTrip = async (searchParams) => {
        try {
            console.log("searchparams", searchParams);
            const response = await axios.get('/api/trips/search', {
                params: searchParams
            });

            console.log("API response: ", response.data.data);
            searchTripList.value = response.data.data;
        } catch (error) {
            console.error('Search error:', error);
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
            const index = tripsList.value.findIndex((t) => t.id === trip.id);
            if (index !== -1) {
                tripsList.value[index] = trip;
            }
            useToast().add({
                severity: "success",
                summary: "Éxito",
                detail: "Viaje actualizado correctamente",
                life: 3000,
            });
        } catch (error) {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
            }
            useToast().add({
                severity: "error",
                summary: "Error",
                detail: "No se pudo actualizar el viaje",
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    };

    const getActiveTrips = async () => {
        const responseDriver = await axios.get("/api/app/driver-trip-active");
        for (const element of responseDriver.data.data) {
            activeDriverTripsList.value.push(element);
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

    const deleteTrip = async (trip) => {
        if (isLoading.value) return;

        isLoading.value = true;

        try {
            await axios.delete("/api/trip/" + trip.id);
            // Eliminar el viaje de la lista
            tripsList.value = tripsList.value.find((t) => t.id !== trip.id);
            useToast().add({
                severity: "success",
                summary: "Éxito",
                detail: "Viaje eliminado correctamente",
                life: 3000,
            });
        } catch (error) {
            console.error("Error deleting trip:", error);
            useToast().add({
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

    const reservedTrip = async (trip, tripID, seats) => {
        try {
            const dataTrip = {
                available_seats: trip.value.available_seats,
                seats_reserved: seats,
                reservation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
                checkIn: null
            }

            console.log(dataTrip);

            const response = await axios.post("/api/trip/reserve/" + tripID, dataTrip);
            console.log("API response, Trip reservado: " + response.data.data);
        } catch (error) {
            console.log("Error updating: ", error);
        }
    }

    return {
        // trips,
        // trip,
        tripsList,
        tripList,
        searchTripList,
        getTrips,
        getTrip,
        updateTrip,
        deleteTrip,
        // addUnavailable_seat,
        reservedTrip,
        searchTrip,
        validationErrors,
        getActiveTrips,
        activeDriverTripsList,
    };
}

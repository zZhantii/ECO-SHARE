import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, inject } from "vue";

export default function useTrips() {
    const tripsList = ref([]);
    const tripList = ref({});
    const isLoading = ref(false);
    const validationErrors = ref([]);
    const swal = inject("$swal");

    const activeDriverTripsList = ref([]);
    const activePassengerTripsList = ref([]);

    const toast = useToast();

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

    async function getTrip(tripId) {
        if (isLoading.value || tripList.value.length > 0) return;
        isLoading.value = true;

        try {
            const response = await axios.get("/api/trip/" + tripId);
            console.log("API Response:", response.data);
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
        const responseDriver = await axios.get("/api/app/driver-active-trip");

        if (responseDriver.data.data) {
            for (const element of responseDriver.data.data) {
                activeDriverTripsList.value.push(element);
            }
        }
        const responsePassenger = await axios.get(
            "/api/app/passenger-active-trip"
        );
        if (responsePassenger.data.data) {
            for (const element of responsePassenger.data.data) {
                activePassengerTripsList.value.push(element);
            }
        }
        console.log("patata", activeDriverTripsList.value);
    };

    const startDrive = async (tripId) => {
        try {
            const response = await axios.put(`/api/app/start-drive/${tripId}`);

            if (response.data.success == true) {
                swal({
                    icon: "success",
                    title: "Viaje iniciado",
                });
                const index = activeDriverTripsList.value.findIndex(
                    (e) => e.id == tripId
                );

                activeDriverTripsList.value[index].drive_start =
                    response.data.data.drive_start;
            } else {
                swal({
                    icon: "error",
                    title: "No se ha podido iniciar el viaje",
                });
            }
        } catch (e) {
            swal({
                icon: "error",
                title: "Error inesperado en el servidor",
            });
            console.log("error", e);
        }
    };

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

    const deleteTrip = async (trip) => {
        if (isLoading.value) return;

        isLoading.value = true;

        try {
            await axios.delete("/api/trip/" + trip.id);
            // Eliminar el viaje de la lista
            tripsList.value = tripsList.value.filter((t) => t.id !== trip.id);
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

    return {
        tripsList,
        tripList,
        getTrips,
        getTrip,
        updateTrip,
        deleteTrip,
        validationErrors,
        getActiveTrips,
        activeDriverTripsList,
        startDrive,
        endDrive,
        activePassengerTripsList,
    };
}

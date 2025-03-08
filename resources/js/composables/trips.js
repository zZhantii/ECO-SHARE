import axios from "axios";
import { toast } from "primevue";
import { ref, inject } from "vue";
import { tr } from "yup-locales";

const trips = ref({
    id: 0,
    start_point: "",
    end_point: "",
    departure_time: "",
    available_seats: "",
    price: "",
    user_id: 0,
    vehicle_id: 0
})

const tripsList = ref([]);
const isLoading = ref(false);
const swal = inject("$swal");
const validationErrors = ref([]);

export default function useTrips(user) {
    async function getTrips() {
        if (tripsList.value.length > 0) return;
        axios.get("/api/trip" + user.id).then((response) => {
            for (const e of response.data.data) {
                tripsList.value.push(e);
            }
        });
    }

    const updateTrip = async (trip) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        console.log(trip.id);
        axios
            .put("/api/trip/" + trip.id, trip)
            .then((response) => {
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
    }

    const deleteTrip = async (trip) => {
        console.log("Comienza a borrar");
        console.log(trip.id);
        axios
            .delete("http://localhost:8000/api/trip/" + trip.id)
            .then((response) => { })
        console.log("Se ha eliminado");
    }

    return {
        trip,
        tripsList,
        getTrips,
        updateTrip,
        deleteTrip,
        validationErrors
    }
}
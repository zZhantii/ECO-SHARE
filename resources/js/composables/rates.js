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
        rate: yup.number().required("El campo es requerido"),
    });

    const getRates = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/rates/").then((response) => {
            console.log("API response show rates: ", response.data.data);
            rateList.value = response.data.data; 
        }).catch((error) => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
                console.log(validationErrors.value);
            }
        }).finally(() => (isLoading.value = false));
    };

    const getRateWithId = async (user_id, trip_id) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/rates/" + user_id + "/" + trip_id)
            .then((response) => {
                console.log("API response get rates with ID: ", response.data.data);
                rate.value = response.data.data;
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    }

    const createRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.post("/api/rates/", rate2.value)
            .then((response) => {
                console.log("API response create: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Rate create successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    }

    const updateRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.put("/api/rates/" + rate2.value.pivot.user_id + "/" + rate2.value.pivot.trip_id, rate2.value.pivot)
            .then((response) => {
                console.log("API response update: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Rate updated successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    };

    const deleteRate = async (rate2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/rates/" + rate2.user_id + "/" + rate2.trip_id)
            .then((response) => {
                console.log("API response delete: ", response.data.message);
                swal({
                    icon: "success",
                    title: "Rate deleted successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    };
    

    return { getRates, createRate, getRateWithId, updateRate, deleteRate, rateList, rate, rateSchema, isLoading, validationErrors };
}

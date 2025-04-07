import axios from 'axios';
import { ref, inject } from 'vue';
import * as yup from "yup";
import { es } from "yup-locales";

export default function useReserves() {
    const reserves = ref([]);
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
        user_id: yup.number().required("El campo es requerido"),
        trip_id: yup.number().required("El campo es requerido"),
        seats_reserved: yup.number().required("El campo es requerido"),
        reservation_date: yup.date().required("El campo es requerido"),
        check_in: yup.date(),
    });

    const fetchReserves = async () => {
        try {
            const response = await axios.get('/api/reserves/');
            reserves.value = response.data.data;
        } catch (err) {
        }
    };

    const getReserveWithId = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/reserves/" + reserve2)
            .then((response) => {
                console.log("API response get: ", response.data.data);
                reserve.value = response.data.data[0];
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    }

    const createReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.post("/api/reserves/", reserve2.value)
            .then((response) => {
                console.log("API response delete: ", response.data.data);
                swal({
                    icon: "success",
                    title: "reserves create successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    };

    const updateReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        // axios.put("/api/reserves/" + reserve2.value.id, reserve2.value)
        //     .then((response) => {
        //         console.log("API response update: ", response.data.message)
        //         swal({
        //             icon: "success",
        //             title: "Reserve updated successfully",
        //         });
        //     }).catch((error) => {
        //         if (error.response?.data) {
        //             validationErrors.value = error.response.data.errors;
        //             console.log(validationErrors.value);
        //         }
        //     }).finally(() => isLoading.value = false);
    };

    const deleteReserve = async (reserve2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/reserves/" + reserve2.user_id + "/" + reserve2.trip_id)
            .then((response) => {
                console.log("API response delete: ", response.data.message);
                swal({
                    icon: "success",
                    title: "reserves deleted successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    };

    return {
        reserves,
        reserve,
        reserveSchema,
        validationErrors,
        fetchReserves,
        getReserveWithId,
        createReserve,
        updateReserve,
        deleteReserve,
    };
}
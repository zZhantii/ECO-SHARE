import axios from "axios";
import { ref, inject } from "vue";
import * as yup from "yup";
import { es } from "yup-locales";

export default function useTags() {
    const tag = ref({ id: 0, tag_name: "" });
    const tagList = ref([]);
    const isLoading = ref(false);
    const swal = inject("$swal");
    yup.setLocale(es);
    const validationErrors = ref({});
    const tagSchema = yup.object().shape({
        tag_name: yup.string()
    });

    const getTags = async () => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.get("/api/tag").then((response) => {
            for (const element of response.data.data) {
                tagList.value.push({
                    id: element.id,
                    tag_name: element.tag_name,
                });
            }
        }).catch((error) => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
                console.log(validationErrors.value);
            }
        }).finally(() => (isLoading.value = false));
    };

    const getTagWithID = async (tag2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios
        .get("/api/tag/" + tag2)
        .then((response) => {
            console.log("API response show: ", response.data.data)
            tag.value = response.data.data[0]; 
        }).catch((error) => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
                console.log(validationErrors.value);
            }
        }).finally(() => isLoading.value = false);
    }

    const updateTag = async (tag2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.put("/api/tag/" + tag2.value.id, tag2.value)
        .then((response) => {
            console.log("API response update: ", response.data.message)
            swal({
                icon: "success",
                title: "Tag updated successfully",
            });
        }).catch((error) => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors;
                console.log(validationErrors.value);
            }
        }).finally (() => isLoading.value = false);
    }

    const createTag = async (tag2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.post("/api/tag/", tag2.value)
            .then((response) => {
                console.log("API response create: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Tag create successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    }

    const deleteTag = async (tag2) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios.delete("/api/tag/" + tag2.id, tag2)
            .then((response) => {
                console.log("API response delete: ", response.data.message)
                swal({
                    icon: "success",
                    title: "Tag deleted successfully",
                });
            }).catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                    console.log(validationErrors.value);
                }
            }).finally(() => isLoading.value = false);
    }

    return { getTags, getTagWithID, updateTag, createTag, deleteTag, tagList, tag, tagSchema, isLoading, validationErrors };
}

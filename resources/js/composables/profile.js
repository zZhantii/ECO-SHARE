import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default function useProfile() {
    const profile = ref({
        name: "",
        email: "",
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject("$swal");

    const getProfile = async () => {
        profile.value = auth.user.value;
    };

    const updateProfile = async (profile) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axios
            .put("/api/user", profile)
            .then(({ data }) => {
                if (data.success) {
                    swal({
                        icon: "success",
                        title: "Perfil actualizado con éxito",
                    });
                }
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const uploadAvatar = async (avatarFile, user) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        console.log(avatarFile.value);

        let serializedForm = new FormData();

        serializedForm.append("avatar", avatarFile.value);

        axios
            .post("/api/user-avatar", serializedForm, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                swal({
                    icon: "success",
                    title: "Avatar cambiado satisfactoriamente",
                });

                user.value.avatar = response.data.data.media[0].original_url;
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };
    const deleteImage = async () => {
        const response = await axios.delete("/api/delete-avatar");
        if (response.data.success) {
            swal({
                icon: "success",
                title: "Imagen de perfil eliminada con éxito.",
            });
        }
    };

    return {
        profile,
        getProfile,
        updateProfile,
        deleteImage,
        validationErrors,
        isLoading,
        uploadAvatar,
    };
}

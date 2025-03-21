<template>
    <main id="tab-pannel" class="bg-white">
        <div class="p-0 col-11 d-flex justify-content-center">
            <Tabs class="col-none-11 col-md-6 mt-4 mt-5" value="0">
                <TabList class="ms-4 col-11">
                    <Tab class="col-none-5 col-md-8 color-og fs-5 p-2" value="0"
                        >Información personal</Tab
                    >
                    <Tab
                        class="col-none-5 col-md-8 color-og fs-5 p-2"
                        value="1"
                        @click="getVehicles"
                        >Gestionar vehículos</Tab
                    >
                </TabList>
                <TabPanels class="mt-2">
                    <TabPanel value="0">
                        <div class="container">
                            <div class="mt-4 col-11 d-block d-md-flex gap-3">
                                <div class="gap-4 col-none-11 col-md-9">
                                    <Avatar
                                        v-if="user?.avatar"
                                        :image="user.avatar"
                                        class="mr-2 mb-3 avatar"
                                        size="xlarge"
                                        shape="circle"
                                    />
                                    <Avatar
                                        v-else
                                        :label="
                                            user.alias?.charAt(0).toUpperCase()
                                        "
                                        :image="user.avatar"
                                        class="mr-2 mb-3 avatar"
                                        size="xlarge"
                                        style="
                                            background-color: #ece9fc;
                                            color: #2a1261;
                                        "
                                    />
                                    <p class="fs-2 mb-5">
                                        <strong>{{ user.alias }} </strong>
                                    </p>

                                    <Button
                                        label="Cambiar imagen de perfil"
                                        class="btn-secondary"
                                        icon="pi pi-plus"
                                        @click="visibleAvatarDialog = true"
                                    />

                                    <Dialog
                                        v-if="visibleAvatarDialog"
                                        v-model:visible="visibleAvatarDialog"
                                        header="Editar imagen de perfil"
                                        :style="{ width: '25rem' }"
                                    >
                                        <DropZone
                                            class="mb-5 mt-5 d-flex"
                                            v-model="avatarFile"
                                        />
                                        <div class="gap-3 w-100">
                                            <Button
                                                label="Subir imagen"
                                                class="btn-primary me-5"
                                                @click="upAvatarFile"
                                            />
                                            <Button
                                                @click="removeAvatar"
                                                label="Quitar imagen"
                                                class="btn-secondary"
                                            />
                                        </div>
                                    </Dialog>
                                </div>
                                <div
                                    class="container d-flex flex-column mt-5 justify-content-center col-none-11 col-md-9"
                                >
                                    <div></div>
                                    <div
                                        class="d-flex align-items-center justify-content-between gap-3"
                                    >
                                        <label class="w-50 mb-3" for=""
                                            >Nombre</label
                                        >
                                        <p class="w-50">
                                            <strong> {{ user.name }}</strong>
                                        </p>
                                    </div>
                                    <div
                                        class="d-flex align-items-center justify-content-between gap-3"
                                    >
                                        <label class="w-50" for=""
                                            >Apellidos</label
                                        >
                                        <p class="w-50 mb-3">
                                            <strong> {{ fullSurname }}</strong>
                                        </p>
                                    </div>

                                    <div
                                        class="d-flex align-items-center justify-content-between gap-3"
                                    >
                                        <label class="w-50" for=""
                                            >Correo Electrónico</label
                                        >
                                        <p class="w-50 mb-4">
                                            <strong> {{ user.email }}</strong>
                                        </p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <Button
                                            class="mt-3 me-2 btn-primary"
                                            label="Editar datos personales"
                                            @click="
                                                (visible = true),
                                                    (tempData.value = {
                                                        ...user.value,
                                                    })
                                            "
                                        />
                                        <Button
                                            class="mt-3 btn-secondary"
                                            label="Cambiar contraseña"
                                            @click="visiblePassDialog = true"
                                        />
                                    </div>

                                    <Dialog
                                        v-if="visible"
                                        v-model:visible="visible"
                                        modal
                                        header="Editar perfil"
                                        :style="{ width: '40rem' }"
                                    >
                                        <form
                                            @submit.prevent="handleUserUpdate"
                                        >
                                            <span
                                                class="text-surface-500 dark:text-surface-400 block mb-8"
                                                >Edita tu información
                                                personal.</span
                                            >
                                            <div
                                                class="flex items-center gap-4 mb-4"
                                            >
                                                <label
                                                    for="name"
                                                    class="font-semibold w-25"
                                                    >Nombre</label
                                                >
                                                <InputText
                                                    v-model="tempData.name"
                                                    id="name"
                                                    class="flex-auto"
                                                    autocomplete="off"
                                                />
                                            </div>
                                            <div
                                                class="flex items-center gap-4 mb-4"
                                            >
                                                <label
                                                    for="surname1"
                                                    class="font-semibold w-25"
                                                    >Primer apellido</label
                                                >
                                                <InputText
                                                    v-model="tempData.surname1"
                                                    id="surname1"
                                                    class="flex-auto"
                                                    autocomplete="off"
                                                />
                                            </div>
                                            <div
                                                class="flex items-center gap-4 mb-4"
                                            >
                                                <label
                                                    for="surname2"
                                                    class="font-semibold w-25"
                                                    >Segundo apellido</label
                                                >
                                                <InputText
                                                    v-model="tempData.surname2"
                                                    id="surname2"
                                                    class="flex-auto"
                                                    autocomplete="off"
                                                />
                                            </div>
                                            <div
                                                class="flex items-center gap-4 mb-8"
                                            >
                                                <label
                                                    for="email"
                                                    class="font-semibold w-25"
                                                    >Email</label
                                                >
                                                <InputText
                                                    v-model="tempData.email"
                                                    id="email"
                                                    class="flex-auto"
                                                    autocomplete="off"
                                                />
                                            </div>
                                            <div class="flex justify-end gap-2">
                                                <Button
                                                    type="button"
                                                    label="Cancelar"
                                                    severity="secondary"
                                                    @click="resetForm"
                                                ></Button>
                                                <Button
                                                    type="submit"
                                                    label="Guardar"
                                                    class="btn-primary"
                                                ></Button>
                                            </div>
                                        </form>
                                    </Dialog>
                                    <Dialog
                                        v-if="visiblePassDialog"
                                        v-model:visible="visiblePassDialog"
                                        modal
                                        header="Cambiar contraseña"
                                        :style="{ width: '25rem' }"
                                    >
                                        <form
                                            @submit.prevent="handlePassUpdate"
                                        >
                                            <span
                                                class="text-surface-500 dark:text-surface-400 block mb-8"
                                                >Actualiza la contraseña.</span
                                            >
                                            <div
                                                class="flex items-center gap-4 mb-4"
                                            >
                                                <label
                                                    for="pwd1"
                                                    class="font-semibold w-24"
                                                    >Nueva contraseña</label
                                                >
                                                <Password
                                                    v-model="pwd1"
                                                    min="8"
                                                    toggleMask
                                                    weakLabel="Demasiado simple"
                                                />
                                            </div>
                                            <div
                                                class="flex items-center gap-4 mb-4"
                                            >
                                                <label
                                                    for="pwd2"
                                                    class="font-semibold w-24"
                                                    >Repite la contraseña</label
                                                >

                                                <Password
                                                    v-model="pwd2"
                                                    min="8"
                                                    toggleMask
                                                    weakLabel="Demasiado simple"
                                                />
                                            </div>

                                            <div class="flex justify-end gap-2">
                                                <Button
                                                    type="button"
                                                    label="Cancelar"
                                                    severity="secondary"
                                                    @click="resetForm"
                                                ></Button>
                                                <Button
                                                    type="submit"
                                                    label="Guardar"
                                                ></Button>
                                            </div>
                                        </form>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div>
                            <ul
                                class="ms-5 mt-3 ms-5 d-flex flex-column align-items-center"
                            >
                                <li
                                    v-if="vehiclesList.length > 0"
                                    v-for="vehicle in vehiclesList"
                                    :key="vehicle.id"
                                    @click="() => openDialog(vehicle.id)"
                                    class="primary-a ms-5 w-50 mb-3 d-flex justify-content-between align-items-center gap-5"
                                >
                                    {{ vehicle.brand.toUpperCase() }} -
                                    {{ vehicle.model.toUpperCase() }} ({{
                                        vehicle.plate.toUpperCase()
                                    }})<i class="fas fa-ellipsis-v" />
                                </li>
                                <h2 v-else>No tienes vehículos registrados</h2>

                                <Dialog
                                    v-if="visibleVehicleDialog == true"
                                    v-model:visible="visibleVehicleDialog"
                                    modal
                                    header="Editar vehículo"
                                    :style="{ width: '40rem' }"
                                >
                                    <form
                                        @submit.prevent="
                                            handleVehicleUpdate(tempVehicle.id)
                                        "
                                    >
                                        <span
                                            class="text-surface-500 dark:text-surface-400 block mb-8"
                                            >Edita los datos de tu
                                            vehículo</span
                                        >
                                        <div
                                            class="flex items-center gap-4 mb-4"
                                        >
                                            <label
                                                for="name"
                                                class="font-semibold w-25"
                                                >Marca</label
                                            >
                                            <InputText
                                                v-model="tempVehicle.brand"
                                                class="flex-auto"
                                                autocomplete="off"
                                            />
                                        </div>
                                        <div
                                            class="flex items-center gap-4 mb-4"
                                        >
                                            <label
                                                for="name"
                                                class="font-semibold w-25"
                                                >Modelo</label
                                            >
                                            <InputText
                                                v-model="tempVehicle.model"
                                                class="flex-auto"
                                                autocomplete="off"
                                            />
                                        </div>
                                        <div
                                            class="flex items-center gap-4 mb-4"
                                        >
                                            <label
                                                for="name"
                                                class="font-semibold w-25"
                                                >Combustible</label
                                            >
                                            <SelectButton
                                                v-model="tempVehicle.fuel_type"
                                                :options="options"
                                                aria-labelledby="basic"
                                            />
                                        </div>
                                        <div
                                            class="flex items-center gap-4 mb-4"
                                        >
                                            <label
                                                for="name"
                                                class="font-semibold w-25"
                                                >Plazas</label
                                            >
                                            <InputNumber
                                                v-model="tempVehicle.pax_number"
                                                inputId="integeronly"
                                                :min="1"
                                                :max="5"
                                                showButtons
                                            />
                                        </div>
                                        <div
                                            class="d-flex justify-content-between align-items-end"
                                        >
                                            <Button
                                                label="Guardar"
                                                class="btn-primary mt-3"
                                                type="submit"
                                            />
                                            <ConfirmPopup />

                                            <Button
                                                @click="
                                                    () =>
                                                        removeVehicle(
                                                            tempVehicle
                                                        )
                                                "
                                                class="h-100"
                                                label="Eliminar"
                                                icon="fa fa-trash"
                                                severity="danger"
                                                outlined
                                            />
                                        </div>
                                    </form>
                                </Dialog>

                                <Button
                                    label="Añadir vehículo"
                                    class="btn-primary mt-3"
                                    @click="openAddVehicleDialog"
                                />
                            </ul>
                            <Dialog
                                v-if="visibleAddVehicle"
                                v-model:visible="visibleAddVehicle"
                                modal
                                header="Añadir vehiculo"
                                :style="{ width: '50rem' }"
                            >
                                <form @submit.prevent="handleAddVehicle()">
                                    <span
                                        class="text-surface-500 dark:text-surface-400 block mb-8"
                                        >Introduce los datos para registrar tu
                                        vehículo</span
                                    >
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="plate"
                                            class="font-semibold w-25"
                                            >Matrícula del vehículo</label
                                        >
                                        <div class="d-flex flex-column">
                                            <InputText
                                                v-model="tempVehicle.plate"
                                                id="plate"
                                                class="flex-auto"
                                                autocomplete="off"
                                            />
                                            <Message
                                                size="small"
                                                severity="secondary"
                                                variant="simple"
                                                >Introduce la matrícula con
                                                formato XXXX000 sin
                                                guiones</Message
                                            >
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="brand"
                                            class="font-semibold w-25"
                                            >Marca</label
                                        >
                                        <InputText
                                            v-model="tempVehicle.brand"
                                            id="brand"
                                            class="flex-auto"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="brand"
                                            class="font-semibold w-25"
                                            >Modelo</label
                                        >
                                        <InputText
                                            v-model="tempVehicle.model"
                                            id="brand"
                                            class="flex-auto"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="consumption"
                                            class="font-semibold w-25"
                                            >Consumo de combustible</label
                                        >
                                        <InputNumber
                                            v-model="tempVehicle.consumption"
                                            inputId="minmaxfraction"
                                            :minFractionDigits="1"
                                            :maxFractionDigits="1"
                                            showButtons
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="fuel_type"
                                            class="font-semibold w-25"
                                            >Tipo de combustibles</label
                                        >
                                        <SelectButton
                                            v-model="tempVehicle.fuel_type"
                                            :options="options"
                                            aria-labelledby="basic"
                                            class=""
                                        />
                                    </div>

                                    <div class="flex items-center gap-4 mb-8">
                                        <label
                                            for="pax_number"
                                            class="font-semibold w-25"
                                            >Número de plazas</label
                                        >
                                        <div class="d-flex flex-column">
                                            <InputNumber
                                                v-model="tempVehicle.pax_number"
                                                inputId="integeronly"
                                                :min="1"
                                                :max="1"
                                                showButtons
                                            />
                                            <Message
                                                size="small"
                                                severity="secondary"
                                                variant="simple"
                                                >Sólo las disponibles para
                                                pasajeros, sin contar al
                                                conductor</Message
                                            >
                                        </div>
                                    </div>
                                    <div class="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            label="Cancelar"
                                            severity="secondary"
                                            @click="visibleAddVehicle = false"
                                        ></Button>
                                        <Button
                                            label="Guardar"
                                            type="submit"
                                        ></Button>
                                    </div>
                                </form>
                            </Dialog>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
        <Toast />
    </main>
</template>
<script setup>
import { authStore } from "../../store/auth.js";
import useUsers from "@/composables/users.js";
import { onMounted, ref } from "vue";
import useProfile from "@/composables/profile.js";
import { computed, watch } from "vue";
import Password from "primevue/password";
import useVehicles from "@/composables/vehicles.js";
import * as yup from "yup";
import { es } from "yup-locales";
import { find, replace } from "lodash";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import DropZone from "@/components/DropZone.vue";

const confirm = useConfirm();
const toast = useToast();
const { updateProfile, validationErrors, deleteImage, uploadAvatar } =
    useProfile();
const { getUser, user } = useUsers();
const { getVehicles, addVehicle, vehicle, vehiclesList, updateVehicle } =
    useVehicles();

const avatarFile = ref(null);
const visible = ref(false);
const visibleVehicleDialog = ref(false);
const visiblePassDialog = ref(false);
const visibleAddVehicle = ref(false);
const visibleAvatarDialog = ref(false);
const tempData = ref({});
const options = ["Gasolina", "Diésel"];
const pwd1 = ref("");
const pwd2 = ref("");
const tempVehicle = ref({});
const userSchema = yup.object().shape({
    id: yup.number().required(),
    alias: yup.string().required(),
    name: yup.string().required("El campo nombre es obligatorio"),
    surname1: yup.string().required("El primer apellido es obligatorio"),
    email: yup
        .string()
        .email()
        .required("El correo electrónico es obligatorio"),
});
const passSchema = yup.object().shape({
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 carácteres"),
});

const vehicleSchema = yup.object({
    plate: yup
        .string()
        .required("La matrícula es un campo obligatorio")
        .min(7)
        .max(8),
    brand: yup
        .string()
        .required("La marca del vehículo es un campo obligatorio."),
    model: yup
        .string()
        .required("La marca del vehículo es un campo obligatorio."),
    consumption: yup
        .number()
        .required("El consumo del vehículo es obligatorio.")
        .min(1)
        .max(50),
    fuel_type: yup.string().required("Selecciona el tipo de combustible."),
    pax_number: yup
        .number()
        .required("Introduce el número de plazas disponibles de tu vehículo")
        .min(1)
        .max(6),
});

onMounted(async () => {
    tempData.value = { ...user.value };
    getVehicles();
});

const removeVehicle = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: "¿Estás seguro/a que quieres eliminar este vehículo?",
        icon: "pi pi-info-circle",
        rejectProps: {
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Eliminar",
            severity: "danger",
        },
        accept: () => {
            event.user_id = null;

            updateVehicle(event);

            visibleVehicleDialog.value = false;
        },
        reject: () => {
            toast.add({
                verity: "info",
                summary: "Eliminación cancelada",
                detail: "El vehiculo no se ha eliminado",
                life: 3000,
            });
            console.log("El vehiculo no se ha eliminado.");
        },
    });
};

function openAddVehicleDialog() {
    tempVehicle.value = { ...vehicle.value };
    visibleAddVehicle.value = true;
}

function openDialog(id) {
    visibleVehicleDialog.value = true;
    tempVehicle.value = { ...vehiclesList.value.find((v) => v.id == id) };
}

async function handleAddVehicle() {
    try {
        await vehicleSchema.validate({
            plate: tempVehicle.value.plate,
            brand: tempVehicle.value.brand,
            model: tempVehicle.value.model,
            consumption: tempVehicle.value.consumption,
            fuel_type: tempVehicle.value.fuel_type,
            pax_number: tempVehicle.value.pax_number,
        });
        addVehicle(tempVehicle);

        visibleAddVehicle.value = false;
    } catch (Error) {
        console.log(Error);
        toast.add({
            severity: "info",
            summary: "Faltan datos o los formatos no son adecuados.",
            detail: Error.message,
            life: 3000,
        });
    }
}

async function handlePassUpdate() {
    if (pwd1.value != "" && pwd1.value == pwd2.value) {
        try {
            tempData.value.password = pwd1.value;
            let tempPassword = { value: tempData.value.password };
            console.log(tempPassword);
            await passSchema.validate({ password: tempPassword.value });
            toast.add({
                severity: "success",
                summary: "Contraseña actualizada",
                detail: "La contraseña ha sida cambiada con éxito.",
                life: 3000,
            });
            updateProfile(tempData.value);
            user.value = { ...tempData.value };
            visiblePassDialog.value = false;
        } catch (Error) {
            toast.add({
                severity: "info",
                summary: "La contraseña debe tener mínimo 8 caracteres",
                detail: Error.message,
                life: 3000,
            });
        }
    } else {
        toast.add({
            severity: "info",
            summary: "Contraseñas diferentes",
            detail: "Las contraseñas no coinciden",
            life: 3000,
        });
    }
}

function upAvatarFile() {
    if (!avatarFile.value) {
        toast.add({
            severity: "info",
            summary: "No se ha cambiado la imagen.",
            detail: "No se ha podido cambiar la imagen de perfil porque no hay ninguna seleccionada.",
            life: 3000,
        });
    } else {
        uploadAvatar(avatarFile, user);
        visibleAvatarDialog.value = false;
        avatarFile.value = null;
    }
}
async function handleUserUpdate() {
    try {
        await userSchema.validate({
            id: tempData.value.id,
            alias: tempData.value.alias,
            name: tempData.value.name,
            surname1: tempData.value.surname1,
            email: tempData.value.email,
        });

        toast.add({
            severity: "success",
            summary: "Perfil actualizado",
            detail: "Los datos del perfil han sido actualizados con éxito.",
            life: 3000,
        });

        updateProfile(tempData.value);

        user.value = { ...tempData.value };
        visible.value = false;
    } catch (Error) {
        toast.add({
            severity: "info",
            summary: "Faltan datos o los datos son incorrectos.",
            detail: Error.message,
            life: 3000,
        });
    }
}

function resetForm() {
    visible.value = false;
    tempData.value = { ...user.value };
    tempVehicle.value = { ...vehicle.value };
    pwd1.value = "";
    pwd2.value = "";
    visiblePassDialog.value = false;
}

function removeAvatar() {
    deleteImage();
    user.value.avatar = null;
    visibleAvatarDialog.value = false;
}

async function handleVehicleUpdate() {
    try {
        console.log(tempVehicle.value);
        await vehicleSchema.validate({
            plate: tempVehicle.value.plate,
            brand: tempVehicle.value.brand,
            model: tempVehicle.value.model,
            consumption: tempVehicle.value.consumption,
            fuel_type: tempVehicle.value.fuel_type,
            pax_number: tempVehicle.value.pax_number,
        });

        updateVehicle(tempVehicle.value);

        visibleVehicleDialog.value = false;
    } catch (Error) {
        toast.add({
            severity: "info",
            summary: "Faltan datos o los formatos no son adecuados.",
            detail: Error.message,
            life: 3000,
        });
    }
}
</script>
<style scoped>
.color-og {
    color: #054851 !important;
}

.avatar {
    height: 80px;
    width: 80px;
}

Message {
    color: rgb(146, 146, 146) !important;
}

p,
label {
    font-size: 1.1rem;
}

li,
ul {
    padding: 10px;
    list-style: none;
}

li:hover {
    cursor: pointer;
}

#tab-pannel {
    min-height: 74vh;
}

Button {
    padding: 10px 15px !important;
}

.p-fileupload-basic {
    width: 80%;
    justify-content: space-between;
    margin-bottom: 35px;
}
</style>

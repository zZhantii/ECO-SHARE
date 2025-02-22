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
                                        :label="
                                            data.alias?.charAt(0).toUpperCase()
                                        "
                                        class="mr-2 mb-3 avatar"
                                        size="xlarge"
                                        style="
                                            background-color: #ece9fc;
                                            color: #2a1261;
                                        "
                                    />
                                    <p class="fs-2 mb-5">
                                        <strong>{{ data.alias }} </strong>
                                    </p>
                                    <Button
                                        label="Añadir fotografía"
                                        class="btn-secondary"
                                        icon="pi pi-plus"
                                    />
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
                                            <strong> {{ data.name }}</strong>
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
                                            <strong> {{ data.email }}</strong>
                                        </p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <Button
                                            class="mt-3 me-2 btn-primary"
                                            label="Editar datos personales"
                                            @click="
                                                (visible = true),
                                                    (tempData.value = {
                                                        ...data.value,
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
                                    @click="openDialog(vehicle.id)"
                                    class="primary-a ms-5 w-50 mb-3 d-flex justify-content-between align-items-center gap-5"
                                >
                                    {{ vehicle.brand }} -
                                    {{ vehicle.model }} ({{ vehicle.plate }})<i
                                        class="fas fa-ellipsis-v"
                                    />
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
                                            handleVehicleUpdate(
                                                selectedVehicle.id
                                            )
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
                                                v-model="selectedVehicle.brand"
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
                                                v-model="selectedVehicle.model"
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
                                                v-model="
                                                    selectedVehicle.fuel_type
                                                "
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
                                                v-model="
                                                    selectedVehicle.pax_number
                                                "
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
                                                    confirm2(selectedVehicle)
                                                "
                                                class="h-100"
                                                label="Eliminar"
                                                icon="fa fa-trash"
                                                severity="danger"
                                                outlined
                                            ></Button>
                                        </div>
                                    </form>
                                </Dialog>

                                <Button
                                    label="Añadir vehículo"
                                    class="btn-primary mt-3"
                                    @click="handleVehicleUpdate"
                                />
                            </ul>
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
import { computed } from "vue";
import Password from "primevue/password";
import useVehicles from "@/composables/vehicles.js";
import * as yup from "yup";
import { es } from "yup-locales";
import { find } from "lodash";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const confirm = useConfirm();
const toast = useToast();
const { updateProfile } = useProfile();
const { getUser, user } = useUsers();
const { getVehicles, vehicle, vehiclesList, updateVehicle, deleteVehicle } =
    useVehicles();
const visible = ref(false);
let selectedVehicle = ref({});
const visibleVehicleDialog = ref(false);
const visiblePassDialog = ref(false);
const data = ref({});
const tempData = ref({});
const options = ["Gasolina", "Diésel"];
const pwd1 = ref("");
const pwd2 = ref("");
const updateSchema = yup.object().shape({
    id: yup.number().required(),
    alias: yup.string().required(),
    name: yup.string().required("El campo nombre es obligatorio"),
    surname1: yup.string().required("El campo apellido es obligatorio"),
    surname2: yup.string().required("El campo apellido es obligatorio"),
    email: yup
        .string()
        .email()
        .required("El correo electrónico es obligatorio"),
});

const updatePassSchema = yup.object().shape({
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 carácteres"),
});

onMounted(async () => {
    user.value = await getUser(authStore().user?.id);
    data.value = {
        id: user.value[0]?.id,
        alias: user.value[0]?.alias,
        name: user.value[0]?.name,
        surname1: user.value[0]?.surname1,
        surname2: user.value[0]?.surname2,
        email: user.value[0]?.email,
    };
    tempData.value = { ...data.value };
    getVehicles();
});

const fullSurname = computed(() => {
    return `${data.value.surname1} ${data.value.surname2}`;
});
const confirm2 = (event) => {
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
            deleteVehicle(event);
            toast.add({
                severity: "success",
                summary: "Eliminado",
                detail: "Vehículo eliminado con éxito",
                life: 3000,
            });
            vehiclesList.value.splice(event);
            visibleVehicleDialog.value = false;
        },
        reject: () => {
            toast.add({
                severity: "error",
                summary: "Rejected",
                detail: "You have rejected",
                life: 3000,
            });
        },
    });
};

function openDialog(id) {
    visibleVehicleDialog.value = true;
    selectedVehicle.value = { ...vehiclesList.value.find((v) => v.id == id) };
}

async function handlePassUpdate() {
    if (pwd1.value != "" && pwd1.value == pwd2.value) {
        try {
            tempData.value.password = pwd1.value;
            let tempPassword = { value: tempData.value.password };
            console.log(tempPassword);
            await updatePassSchema.validate({ password: tempPassword.value });
            toast.add({
                severity: "success",
                summary: "Contraseña actualizada",
                detail: "La contraseña ha sido cambiada con éxito.",
                life: 3000,
            });
            updateProfile(tempData.value);
            data.value = { ...tempData.value };
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

async function handleUserUpdate() {
    try {
        await updateSchema.validate({
            id: tempData.value.id,
            alias: tempData.value.alias,
            name: tempData.value.name,
            surname1: tempData.value.surname1,
            surname2: tempData.value.surname2,
            email: tempData.value.email,
        });

        toast.add({
            severity: "success",
            summary: "Perfil actualizado",
            detail: "Los datos del perfil han sido actualizados con éxito.",
            life: 3000,
        });

        updateProfile(tempData.value);

        data.value = { ...tempData.value };
        visible.value = false;
    } catch (Error) {
        toast.add({
            severity: "error",
            summary: "Datos incorrectos",
            detail: Error.message,
            life: 3000,
        });
    }
}

function resetForm() {
    visible.value = false;
    tempData.value = { ...data.value };
}

function handleVehicleUpdate() {
    updateVehicle(selectedVehicle.value);
    vehiclesList.value.map((v) => {
        if (v.id == selectedVehicle.value.id) {
            v.brand = selectedVehicle.value.brand;
            v.model = selectedVehicle.value.model;
            v.fuel_type = selectedVehicle.value.fuel_type;
            v.pax_number = selectedVehicle.value.pax_number;
        }
    });

    visibleVehicleDialog.value = false;
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
    min-height: 70vh;
}

Button {
    padding: 10px 15px !important;
}
</style>

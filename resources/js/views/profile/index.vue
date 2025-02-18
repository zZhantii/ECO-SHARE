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
                                            data.name?.charAt(0).toUpperCase()
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
                                            @click="visible = true"
                                        />
                                        <Button
                                            class="mt-3 btn-secondary"
                                            label="Cambiar contraseña"
                                            @click="visible = true"
                                        />
                                    </div>

                                    <Dialog
                                        v-model:visible="visible"
                                        modal
                                        header="Editar perfil"
                                        :style="{ width: '40rem' }"
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
                                                id="username"
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
                                                @click="visible = false"
                                            ></Button>
                                            <Button
                                                type="button"
                                                label="Guardar"
                                                class="btn-primary"
                                                @click="handleUserUpdate"
                                            ></Button>
                                        </div>
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
                                    v-if="isOpen == true"
                                    v-model:visible="visibleVehicleDialog"
                                    modal
                                    header="Editar vehículo"
                                    :style="{ width: '40rem' }"
                                >
                                    <span
                                        class="text-surface-500 dark:text-surface-400 block mb-8"
                                        >Edita los datos de tu vehículo</span
                                    >
                                    <div class="flex items-center gap-4 mb-4">
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
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="name"
                                            class="font-semibold w-25"
                                            >Marca</label
                                        >
                                        <InputText
                                            v-model="selectedVehicle.model"
                                            class="flex-auto"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="name"
                                            class="font-semibold w-25"
                                            >Combustible</label
                                        >
                                        <SelectButton
                                            v-model="selectedVehicle.fuel_type"
                                            :options="options"
                                            aria-labelledby="basic"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 mb-4">
                                        <label
                                            for="name"
                                            class="font-semibold w-25"
                                            >Plazas</label
                                        >
                                        <InputNumber
                                            v-model="selectedVehicle.pax_number"
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
                                            @click="
                                                handleVehicleUpdate(vehicle.id)
                                            "
                                        />
                                        <ConfirmPopup />

                                        <Button
                                            @click="confirm2(selectedVehicle)"
                                            class="h-100"
                                            label="Eliminar"
                                            icon="fa fa-trash"
                                            severity="danger"
                                            outlined
                                        ></Button>
                                    </div>
                                    <Toast />
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
    </main>
</template>
<script setup>
import { authStore } from "../../store/auth.js";
import useUsers from "@/composables/users.js";
import { onMounted, ref } from "vue";
import useProfile from "@/composables/profile.js";
import { computed } from "vue";
import useVehicles from "@/composables/vehicles.js";
import { da } from "yup-locales";
import { find } from "lodash";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const isOpen = ref(false);
const { updateProfile } = useProfile();
const { getUser, user } = useUsers();
const { getVehicles, vehicle, vehiclesList, updateVehicle, deleteVehicle } =
    useVehicles();
const visible = ref(false);
let selectedVehicle = ref({});
const visibleVehicleDialog = ref(false);
const data = ref({});
const tempData = ref({});
const options = ["Gasolina", "Diésel"];

onMounted(async () => {
    user.value = await getUser(authStore().user?.id);
    data.value = {
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
    try {
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
                    severity: "info",
                    summary: "Eliminado",
                    detail: "Vehículo eliminado con éxito",
                    life: 3000,
                });
                vehiclesList.value.splice(event);
                visibleVehicleDialog.value = false;
                isOpen.value = false;
            },
            reject: () => {
                toast.add({
                    severity: "error",
                    summary: "Rejected",
                    detail: "You have rejected",
                    life: 3000,
                });
                isOpen = false;
            },
        });
    } catch (error) {
        console.error("Error en el elemento:", event.currentTarget);
        console.error("Error:", error);
    }
};

function openDialog(id) {
    isOpen.value = true;
    visibleVehicleDialog.value = true;
    selectedVehicle.value = { ...vehiclesList.value.find((v) => v.id == id) };
}

function handleUserUpdate() {
    updateProfile(tempData.value);
    data.value = { ...tempData.value };
    visible.value = false;
}

function handleVehicleUpdate() {
    updateVehicle(selectedVehicle.value);
    vehiclesList.value.map((v) => {
        console.log(v.id + " " + selectedVehicle.value.id);
        console.log(v);
        if (v.id == selectedVehicle.value.id) {
            v.brand = selectedVehicle.value.brand;
            v.model = selectedVehicle.value.model;
            v.fuel_type = selectedVehicle.value.fuel_type;
            v.pax_number = selectedVehicle.value.pax_number;
        }
        console.log(v);
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

<template>

    <div class="grid">
        <div class="col-12 md:col-4 lg:col-4 xl:col-4">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="account-settings">
                        <div class="user-profile">
                            <div class="user-avatar">
                                <!-- <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"> -->
                                <!-- :fileLimit=1  -->
                                <FileUpload name="picture" url="/api/users/updateimg" @before-upload="onBeforeUpload"
                                    @upload="onTemplatedUpload($event)" accept="image/*" :maxFileSize="1500000"
                                    @select="onSelectedFiles" pt:content:class="fu-content"
                                    pt:buttonbar:class="fu-header" pt:root:class="fu" class="fu">

                                    <template
                                        #header="{ chooseCallback, uploadCallback, clearCallback, files, uploadedFiles }">
                                        <div
                                            class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                                            <div class="flex gap-2">
                                                <Button @click="chooseCallback()" icon="pi pi-images" rounded
                                                    outlined></Button>
                                                <Button @click="uploadEvent(uploadCallback, uploadedFiles)"
                                                    icon="pi pi-cloud-upload" rounded outlined severity="success"
                                                    :disabled="!files || files.length === 0"></Button>
                                                <Button @click="clearCallback()" icon="pi pi-times" rounded outlined
                                                    severity="danger" :disabled="!files || files.length === 0"></Button>
                                            </div>
                                            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                                        </div>
                                    </template>

                                    <template
                                        #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                        <img v-if=" files.length > 0" v-for="(file, index) of files"
                                            :key="file.name + file.type + file.size" role="presentation"
                                            :alt="file.name" :src="file.objectURL"
                                            class="object-fit-cover w-100 h-100 img-profile" />
                                        <div v-else>
                                            <img v-if="uploadedFiles.length > 0"
                                                :key="uploadedFiles[uploadedFiles.length-1].name + uploadedFiles[uploadedFiles.length-1].type + uploadedFiles[uploadedFiles.length-1].size"
                                                role="presentation" :alt="uploadedFiles[uploadedFiles.length-1].name"
                                                :src="uploadedFiles[uploadedFiles.length-1].objectURL"
                                                class="object-fit-cover w-100 h-100 img-profile" />
                                        </div>
                                    </template>

                                    <template #empty>
                                        <div class="flex justify-content-center align-items-center">
                                            <img :src="userImage" :alt="user.value?.[0]?.name || 'Default Avatar'"
                                                class="object-fit-cover w-100 h-100 img-profile" />
                                        </div>
                                    </template>
                                </FileUpload>


                            </div>

                            <h5 class="user-name">{{ user.name }}</h5>
                            <h6 class="user-email">{{ user.email }}</h6>
                        </div>

                        <div class="about">

                            <div class="form-group">
                                <label for="roles">Roles</label>
                                <MultiSelect id="roles" v-model="selectedRole" :options="roleList" optionLabel="name"
                                    optionValue="id" placeholder="Selecciona los roles" class="w-100"
                                    :maxSelectedLabels="1" :selectionLimit="1" @change="handleRoleChange" />
                            </div>


                            <div class="text-right">
                                <button :disabled="isLoading" class="btn btn-primary w-100" @click="submitForm">
                                    <div v-show="isLoading" class=""></div>
                                    <span v-if="isLoading">Processing...</span>
                                    <span v-else>Guardar</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Personal Details</h6>

                    <div v-if="tempUser">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <InputText v-model="tempUser[0].name" type="text" class="form-control" id="name"
                                :class="{ 'is-invalid': validationErrors?.name }" />
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="surname1">Apellido 1</label>
                            <input v-model="tempUser[0].surname1" type="text" class="form-control" id="surname1">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.surname1">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="surname2">Apellido 2</label>
                            <input v-model="tempUser[0].surname2" type="text" class="form-control" id="surname2">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.surname2">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="alias">Alias</label>
                            <input v-model="tempUser[0].alias" type="text" class="form-control" id="alias">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.alias">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="tempUser[0].email" type="email" class="form-control" id="email">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="tempUser[0].password" type="password" class="form-control" id="password">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.password">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Toast />
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { usePrimeVue } from 'primevue/config';
import useRoles from "@/composables/roles";
import useUsers from "@/composables/users";
import { useToast } from 'primevue/usetoast';

const $primevue = usePrimeVue();
const toast = useToast();
const { roleList, getRoleList } = useRoles();
const { updateUser, getUser, user, createUserDB, deleteUserDB, changeUserPasswordDB, createUserProceduredDB, validationErrors, isLoading } = useUsers();


const route = useRoute()
const tempUser = ref(null);
const selectedRole = ref([]);

const userImage = ref('https://bootdey.com/img/Content/avatar/avatar7.png');

onMounted(async () => {
    await getRoleList();
    await getUser(route.params.id); 
    tempUser.value = user.value;

    if (user.value?.[0]?.roles?.[0]) {
        selectedRole.value = [user.value[0].roles[0].id];
        console.log('Role set to:', selectedRole.value);
    }

    if (user.value?.[0]?.media?.[0]?.original_url) {
        userImage.value = user.value[0].media[0].original_url;
    }
});

const handleRoleChange = (event) => {
    console.log('Role changed to:', event.value);
    if (tempUser.value && tempUser.value[0]) {
        tempUser.value[0].roles = [{
            id: event.value
        }];
    }
};

// https://vuejs.org/api/reactivity-core.html#watcheffect
const submitForm = async () => {
    try {
        console.log('submitForm', selectedRole.value);
        await updateUser(tempUser.value, selectedRole.value);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Usuario actualizado correctamente', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el usuario', life: 3000 });
    }
};

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onBeforeUpload = (event) => {
    console.log('onBeforeUpload')
    event.formData.append('id', user.value[0].id)
};
const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    console.log('onSelectedFiles');
    files.value = event.files;

    if (event.files.length > 1) {
        event.files = event.files.splice(0, event.files.length - 1);
    }

    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = async (callback, uploadedFiles) => {
    console.log('uploadEvent');
    totalSizePercent.value = totalSize.value / 10;
    await callback();
    // if (uploadedFiles.length > 1) {
    //     uploadedFiles = uploadedFiles.splice(0, uploadedFiles.length - 1);
    // }
};

const createUserDBView = async (id) => {
    createUserDB(id).then(response => {
            toast.add({ severity: 'info', summary: 'Base de datos creada', detail: 'Base de datos creada correctamente.', life: 3000 });
        })
        .catch(error => {
            toast.add({ severity: 'warning', summary: 'Error al crear la base de datos', detail: error.response.data.message, life: 3000 });
            console.log(error.response.data.message)
        })
}

const changeUserPasswordDBView = async (id) => {
    changeUserPasswordDB(id).then(response => {
            toast.add({ severity: 'info', summary: 'Base de datos modificada', detail: 'Contraseña cambiada correctamente.', life: 3000 });
        })
        .catch(error => {
            toast.add({ severity: 'danger', summary: 'Error al cambiar la contraseña', detail: error.response.data.message, life: 3000 });
        })
}

const createUserProceduredDBView = async (id) => {
    createUserProceduredDB(id).then(response => {
            toast.add({ severity: 'info', summary: 'Base de datos creada', detail: 'Base de datos creada correctamente.', life: 3000 });
        })
        .catch(error => {
            toast.add({ severity: 'warning', summary: 'Error al crear la base de datos', detail: error.response.data.message, life: 3000 });
            console.log(error.response.data.message)
        })
}

const deleteUserDBView = async (id) => {
    deleteUserDB(id).then(response => {
            toast.add({ severity: 'info', summary: 'Base de datos creada', detail: 'Base de datos creada correctamente.', life: 3000 });
        })
        .catch(error => {
            toast.add({ severity: 'warning', summary: 'Error al crear la base de datos', detail: error.response.data.message, life: 3000 });
            console.log(error.response.data.message)
        })
}

const onTemplatedUpload = (event) => {
    console.log('onTemplatedUpload');
    console.log(event);
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

</script>

<style>
.fu-content {
    padding: 0px !important;
    border: 0px !important;
    border-radius: 6px;
}

.fu-header {
    border: 0px !important;
    border-radius: 6px;
}

.fu {
    display: flex;
    flex-direction: column-reverse;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}


.img-profile {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    aspect-ratio: 1/1;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    margin-bottom: 0.3rem;
}
</style>

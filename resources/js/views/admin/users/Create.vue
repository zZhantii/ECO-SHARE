<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2">
                <div class="surface-card p-4 shadow-2 rounded-4">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Crear Nuevo Usuario</h2>
                        <span class="text-600 font-medium">Ingrese los datos del nuevo usuario</span>
                    </div>

                    <form @submit.prevent="submitForm" class="grid">
                        <div class="col-12 md:col-6 mb-4">
                            <label for="name" class="block text-900 font-medium mb-2">Nombre</label>
                            <InputText id="name" v-model="post.name" class="w-full"
                                :class="{ 'p-invalid': errors.name || validationErrors?.name }"
                                placeholder="Introduce el nombre" />
                            <small class="p-error block mt-1" v-if="errors.name">{{ errors.name }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.name">{{ message
                                }}</small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="alias" class="block text-900 font-medium mb-2">Alias</label>
                            <InputText id="alias" v-model="post.alias" class="w-full"
                                :class="{ 'p-invalid': errors.alias || validationErrors?.alias }"
                                placeholder="Introduce el alias" />
                            <small class="p-error block mt-1" v-if="errors.alias">{{ errors.alias }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.alias">{{ message
                                }}</small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="surname1" class="block text-900 font-medium mb-2">Primer Apellido</label>
                            <InputText id="surname1" v-model="post.surname1" class="w-full"
                                :class="{ 'p-invalid': errors.surname1 || validationErrors?.surname1 }"
                                placeholder="Introduce el primer apellido" />
                            <small class="p-error block mt-1" v-if="errors.surname1">{{ errors.surname1 }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.surname1">{{ message
                                }}</small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="surname2" class="block text-900 font-medium mb-2">Segundo Apellido</label>
                            <InputText id="surname2" v-model="post.surname2" class="w-full"
                                :class="{ 'p-invalid': errors.surname2 || validationErrors?.surname2 }"
                                placeholder="Introduce el segundo apellido" />
                            <small class="p-error block mt-1" v-if="errors.surname2">{{ errors.surname2 }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.surname2">{{ message
                                }}</small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="email" class="block text-900 font-medium mb-2">Email</label>
                            <InputText id="email" type="email" v-model="post.email" class="w-full"
                                :class="{ 'p-invalid': errors.email || validationErrors?.email }"
                                placeholder="ejemplo@email.com" />
                            <small class="p-error block mt-1" v-if="errors.email">{{ errors.email }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.email">{{ message
                                }}</small>
                        </div>

                        <div class="col-12 md:col-6 mb-4">
                            <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
                            <Password id="password" v-model="post.password" :feedback="true" :toggleMask="true"
                                class="w-full" :class="{ 'p-invalid': errors.password || validationErrors?.password }"
                                placeholder="Introduce la contraseña" />
                            <small class="p-error block mt-1" v-if="errors.password">{{ errors.password }}</small>
                            <small class="p-error block mt-1" v-for="message in validationErrors?.password">{{ message
                                }}</small>
                        </div>

            
                        <div class="col-12 flex justify-content-end">
                            <Button type="button" label="Cancelar" class="p-button-text mr-2" @click="$router.back()" />
                            <Button type="submit" label="Guardar" icon="pi pi-check" :loading="isLoading"
                                class="p-button-success" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
    import { onMounted, reactive } from "vue";
    import useRoles from "@/composables/roles";
    import useUsers from "@/composables/users";
    import { useRouter } from "vue-router";

    // Components
    import InputText from 'primevue/inputtext';
    import Password from 'primevue/password';
    import MultiSelect from 'primevue/multiselect';
    import Button from 'primevue/button';

    const { roleList, getRoleList } = useRoles();
    const { storeUser, validationErrors, isLoading } = useUsers();

    const router = useRouter();

    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules";
    defineRule('required', required);
    defineRule('min', min);

    const schema = {
        name: 'required',
        email: 'required',
        password: 'required|min:8',
        surname1: 'required',
        surname2: 'required',
        alias: 'required',
    }

    const { validate, errors } = useForm({ validationSchema: schema })
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: password } = useField('password', null, { initialValue: '' });
    const { value: surname1 } = useField('surname1', null, { initialValue: '' });
    const { value: surname2 } = useField('surname2', null, { initialValue: '' });
    const { value: alias } = useField('alias', null, { initialValue: '' });
    const { value: role_id } = useField('role_id', null, { initialValue: '', label: 'role' });

    const post = reactive({
        name,
        email,
        password,
        role_id,
        surname1,
        surname2,
        alias
    })
    function submitForm() {
        validate().then(form => { if (form.valid) storeUser(post) })
        router.back();
    }
</script>
<style scoped>
.p-password {
    width: 100%;
}

:deep(.p-password-input) {
    width: 100%;
}
</style>

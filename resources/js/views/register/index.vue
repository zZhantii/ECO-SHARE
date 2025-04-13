<template>
    <main class="container-register">
        <section class="container">
            <div class="row justify-content-center my-5">
                <div class="col-md-6">
                    <div class="card border-0 bg-transparent">
                        <div class="card-header bg-transparent d-flex flex-column align-items-center justify-content-around">
                            <img src="/images/Logo_es.svg" alt="Logotipo" height="75px" />

                            <h2 class="text-center">{{ $t("¡Regístrate ya!") }}</h2>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="onFormSubmitRegister">
                                <div class="">
                                    <!-- Alias -->
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.alias" id="alias" type="text" :placeholder="$t('Alias')" class="form-control w-75 mt-4" autofocus />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.alias" :key="message">
                                                {{ $t(message) }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Name -->
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.name" id="name" type="text" :placeholder="$t('name')" class="form-control w-75 mt-4" autofocus />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.name" :key="message">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- surname1 -->
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.surname1" id="surname1" type="text" :placeholder="$t('Surname1')" class="form-control w-75 mt-4" autofocus />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.surname1" :key="message">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Email -->
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.email" id="email" type="email" :placeholder="$t('email')" class="form-control w-75 mt-4" autocomplete="username" />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.email" :key="message">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Password -->
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.password" id="password" type="password" :placeholder="$t('password')" class="form-control w-75 mt-4" autocomplete="current-password" />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.password" :key="message">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center flex-column">
                                        <InputText v-model="registerForm.password_confirmation" id="password_confirmation" type="password" :placeholder="$t('confirm_password')" class="form-control w-75 mt-4" autocomplete="current-password" />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div v-for="message in validationErrors.password_confirmation" :key="message">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Buttons -->
                                    <div class="d-flex gap-4 mt-4 w-75 justify-content-center ms-buttons">
                                        <router-link to="/" class="primary-a d-flex justify-content-center align-items-center gap-3 me-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                                            </svg>{{ $t("Back") }}
                                        </router-link>

                                        <button class="btn btn-primary w-100 " :class="{ 'opacity-25': processing }" :disabled="processing" @click="onFormSubmitRegister">
                                            {{ $t("register") }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Toast />
    </main>
</template>

<script setup>
import useAuth from "@/composables/auth";
import * as yup from "yup";
import { es } from "yup-locales";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";

yup.setLocale(es);
const toast = useToast();

const { registerForm, validationErrors, processing, submitRegister } = useAuth();

const registerSchema = yup.object().shape({
    alias: yup.string().required("El alias es requerido"),
    name: yup.string().required("El nombre es requerido"),
    surname1: yup.string().required("El primer apellido es requerido"),
    email: yup.string().email("El email debe ser válido").required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
    password_confirmation: yup.string().required("La confirmación de la contraseña es requerida"),
});

const onFormSubmitRegister = async () => {
    try {
        await registerSchema.validate(registerForm, { abortEarly: false });
        await submitRegister();
        toast.add({
            severity: "success",
            summary: "Registro exitoso",
            detail: "Te has registrado correctamente",
            life: 3000,
        });
    } catch (error) {
        if (error.inner) {
            error.inner.forEach((e) => {
                if (!validationErrors.value[e.path]) {
                    validationErrors.value[e.path] = [];
                }
                validationErrors.value[e.path].push(e.message);
            });
        } else {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Por favor, corrija los errores en el formulario.",
                life: 3000,
            });
        }
    }
};
</script>

<style scoped>
.container-register {
    display: flex;
    align-items: center;
    height: 100vh;
}

.w-100 {
    width: 75% !important;
}

.ms-buttons {
    margin-left: 75px;
    border: 1px solid red;
}

@media (max-width: 390px) {
    .ms-buttons {
        margin-left: 43px;
        border: 0;
    }
}
</style>
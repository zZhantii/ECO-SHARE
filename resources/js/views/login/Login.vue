<template>
    <main class="container-login">
        <section class="container">
            <div class="row justify-content-center my-5">
                <div class="col-md-6">
                    <div class="card border-0 bg-transparent">
                        <div class="card-header bg-transparent flex-column d-flex align-items-center justify-content-around">
                            <img src="/images/Logo_es.svg" alt="Logotipo" height="75px" />

                            <h2>{{ $t("¡Inicia Sesión!") }}</h2>
                        </div>
                        <div class="card-body">


                            <form @submit.prevent="submitLogin">
                                <!-- alias -->
                                <div class="mb-3 d-flex align-items-center flex-column">
                                    <input v-model="loginForm.alias" id="alias" type="text" class="form-control w-75" :placeholder="$t('Alias')" required autofocus autocomplete="username" />
                                    <!-- Validation Errors -->
                                    <div class="text-danger mt-1">
                                        <div v-for="message in validationErrors?.alias">
                                            {{ message }}
                                        </div>
                                    </div>
                                    <Toast />
                                </div>
                                <!-- Password -->
                                <div class="mb-3 d-flex align-items-center flex-column">
                                    <input v-model="loginForm.password" id="password" type="password" :placeholder="$t('password')" class="form-control w-75" required autocomplete="current-password" />
                                    <!-- Validation Errors -->
                                    <div class="text-danger mt-1">
                                        <div v-for="message in validationErrors?.password">
                                            {{ message }}
                                        </div>
                                    </div>
                                </div>
                                <!-- Remember me -->
                                <div class="form-check w-75 d-flex justify-content-center">
                                    <input class="form-check-input mx-3" type="checkbox" name="remember" v-model="loginForm.remember" id="flexCheckIndeterminate" />
                                    <label class="form-check-label" for="flexCheckIndeterminate">
                                        {{ $t("remember_me") }}
                                    </label>
                                    <router-link :to="{
                                        name: 'auth.forgot-password',
                                    }" class="primary-a mx-4">{{ $t("forgot_password") }}
                                    </router-link>
                                </div>

                                <!-- Buttons -->
                                <div class="d-flex gap-4 mt-4 w-75 justify-content-center ms-buttons">
                                    <router-link to="/" class="primary-a d-flex justify-content-center align-items-center gap-3 me-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
                                            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                                        </svg>{{ $t("Back") }}
                                    </router-link>

                                    <button class="btn btn-primary w-100" :class="{
                                        'opacity-25': processing,
                                    }" :disabled="processing" @click="onFormSubmitLogin">
                                        {{ $t("login") }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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

const { loginForm, validationErrors, processing, submitLogin } = useAuth();

const loginSchema = yup.object().shape({
    alias: yup.string().required('El alias es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});

const onFormSubmitLogin = async () => {
    try {
        await loginSchema.validate(loginForm, { abortEarly: false });
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
        }
        toast.add({
            severity: "error",
            summary: "Error",
            detail: "Por favor, corrija los errores en el formulario.",
            life: 3000,
        });
    }
}

</script>

<style scoped>
.container-login {
    display: flex;
    align-items: center;
    height: 100vh;
}

.w-100 {
    width: 75% !important;
}

.ms-buttons {
    margin-left: 75px;
}
</style>

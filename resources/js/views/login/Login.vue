<template>
    <main class="container-login">
        <section class="container">
            <div class="row justify-content-center my-5">
                <div class="col-md-6">
                    <div class="card border-0 bg-transparent">
                        <div
                            class="card-header bg-transparent flex-column d-flex align-items-center justify-content-around"
                        >
                            <img
                                src="/images/Logo_es.svg"
                                alt="Logotipo"
                                height="75px"
                            />

                            <h2>{{ $t("¡Inicia Sesión!") }}</h2>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="submitLogin">
                                <div class="">
                                    <!-- Email -->
                                    <div class="mb-3">
                                        <input
                                            v-model="loginForm.email"
                                            id="email"
                                            type="email"
                                            class="form-control"
                                            :placeholder="$t('email')"
                                            required
                                            autofocus
                                            autocomplete="username"
                                        />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div
                                                v-for="message in validationErrors?.email"
                                            >
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Password -->
                                    <div class="mb-3">
                                        <input
                                            v-model="loginForm.password"
                                            id="password"
                                            type="password"
                                            :placeholder="$t('password')"
                                            class="form-control"
                                            required
                                            autocomplete="current-password"
                                        />
                                        <!-- Validation Errors -->
                                        <div class="text-danger-600 mt-1">
                                            <div
                                                v-for="message in validationErrors?.password"
                                            >
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Remember me -->
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            name="remember"
                                            v-model="loginForm.remember"
                                            id="flexCheckIndeterminate"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="flexCheckIndeterminate"
                                        >
                                            {{ $t("remember_me") }}
                                        </label>
                                        <router-link
                                            :to="{
                                                name: 'auth.forgot-password',
                                            }"
                                            class="primary-a mx-4"
                                            >{{ $t("forgot_password") }}
                                        </router-link>
                                    </div>

                                    <!-- Buttons -->
                                    <div class="d-flex gap-4 mt-4">
                                        <router-link
                                            to="/"
                                            class="primary-a d-flex justify-content-center align-items-center gap-3 me-5"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="#000000"
                                                viewBox="0 0 256 256"
                                            >
                                                <path
                                                    d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
                                                ></path></svg
                                            >{{ $t("Back") }}
                                        </router-link>

                                        <button
                                            class="btn btn-primary w-100"
                                            :class="{
                                                'opacity-25': processing,
                                            }"
                                            :disabled="processing"
                                        >
                                            {{ $t("login") }}
                                        </button>
                                    </div>
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

const { loginForm, validationErrors, processing, submitLogin } = useAuth();
</script>

<style scoped>
.container-login {
    display: flex;
    align-items: center;
    height: 100vh;
}

.w-100 {
    width: 100% !important;
}
</style>

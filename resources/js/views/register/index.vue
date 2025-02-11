<template>
    <main class="container-register">
        <section class="container">
            <div class="row justify-content-center my-5">
                <div class="col-md-6">
                    <div class="card border-0 bg-transparent">
                        <div
                            class="card-header bg-transparent d-flex align-items-center justify-content-around"
                        >
                            <img
                                src="/images/Logo_es.svg"
                                alt="Logotipo"
                                height="150px"
                            />

                            <h2>{{ $t("¡Registrate ya!") }}</h2>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="submitRegister">
                                <div class="">
                                    <!-- Email -->
                                    <div class="mb-3">
                                        <input
                                            v-model="registerForm.name"
                                            id="name"
                                            type="text"
                                            :placeholder="$t('name')"
                                            class="form-control mt-4"
                                            autofocus
                                        />
                                        <!-- Validation Errors -->
                                        <div class="text-danger mt-1">
                                            <div
                                                v-for="message in validationErrors?.name"
                                            >
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <input
                                            v-model="registerForm.email"
                                            id="email"
                                            type="email"
                                            :placeholder="$t('email')"
                                            class="form-control mt-4"
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
                                    <div class="mb-4">
                                        <input
                                            v-model="registerForm.password"
                                            id="password"
                                            type="password"
                                            :placeholder="$t('password')"
                                            class="form-control mt-4"
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
                                    <div class="mb-4">
                                        <input
                                            v-model="
                                                registerForm.password_confirmation
                                            "
                                            id="password_confirmation"
                                            type="password"
                                            :placeholder="
                                                $t('confirm_password')
                                            "
                                            class="form-control mt-4"
                                            autocomplete="current-password"
                                        />

                                        <!-- Validation Errors -->
                                        <div class="text-danger-600 mt-1">
                                            <div
                                                v-for="message in validationErrors?.password_confirmation"
                                            >
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Buttons -->
                                    <div
                                        class="d-flex flex items-center justify-end mt-4"
                                    >
                                        <button
                                            class="btn btn-primary w-50 mt-4"
                                            :class="{
                                                'opacity-25': processing,
                                            }"
                                            :disabled="processing"
                                        >
                                            {{ $t("register") }}
                                        </button>
                                        <router-link to="/">
                                            <button
                                                class="btn btn-secondary w-50 mt-4"
                                                :class="{
                                                    'opacity-25': processing,
                                                }"
                                                :disabled="processing"
                                            >
                                                {{ $t("Back") }}
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
        </section>
    </main>
</template>

<script setup>
import useAuth from "@/composables/auth";
import useAuth from "@/composables/auth";

const { registerForm, validationErrors, processing, submitRegister } =
    useAuth();
const { registerForm, validationErrors, processing, submitRegister } =
    useAuth();
</script>

<style scoped>
.container-register {
    display: flex;
    align-items: center;
    height: 100vh;
}
</style>

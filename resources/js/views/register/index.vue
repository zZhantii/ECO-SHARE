<template>
    <main class="container">
        <section class="row justify-content-center my-5">
            <div class="col-md-6">
                <div class="card border-0 bg-transparent">
                    <div
                        class="card-header bg-transparent d-flex justify-content-around align-items-center"
                    >
                        <img
                            src="/images/Logo_es.svg"
                            alt="Logotipo"
                            height="150px"
                        />
                        <h1>{{ $t("¡Registrate ya!") }}</h1>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitRegister">
                            <div class="">
                                <!-- Name -->
                                <div class="mb-3">
                                    <input
                                        v-model="registerForm.name"
                                        id="name"
                                        type="text"
                                        :placeholder="$t('name')"
                                        class="form-control"
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
                                <!-- Email -->
                                <div class="mb-3">
                                    <input
                                        v-model="registerForm.email"
                                        id="email"
                                        type="email"
                                        :placeholder="$t('email')"
                                        class="form-control"
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
                                        class="form-control"
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
                                        :placeholder="$t('confirm_password')"
                                        class="form-control"
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
                                <div class="flex items-center justify-end mt-4">
                                    <button
                                        class="btn btn-primary w-100"
                                        :class="{ 'opacity-25': processing }"
                                        :disabled="processing"
                                    >
                                        {{ $t("register") }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import useAuth from "@/composables/auth";

const { registerForm, validationErrors, processing, submitRegister } =
    useAuth();
</script>

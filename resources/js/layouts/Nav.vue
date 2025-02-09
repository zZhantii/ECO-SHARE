<template>
    <nav class="navbar navbar-expand-md bg-nav-color">
        <div class="container">
            <router-link to="/" class="navbar-brand"
                ><SVGLogo class="logo"
            /></router-link>
            <a
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon toggle-icon"></span>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mt-2 mt-lg-0 me-auto mb-2 mb-lg-0 gap-3">
                    <!-- <LocaleSwitcher /> -->
                    <li>
                        <router-link
                            :to="{ name: 'public-posts.index' }"
                            class="primary-a nav-link text-center text-md-start"
                            >Publicar</router-link
                        >
                    </li>
                    <li>
                        <router-link
                            to=""
                            class="primary-a nav-link text-center text-md-start"
                            >Empresa</router-link
                        >
                    </li>
                </ul>
                <ul class="navbar-nav mt-lg-0 ms-auto gap-3 align-items-center">
                    <li class="nav-item">
                        <router-link to="" class="primary-a nav-link"
                            >Ayuda</router-link
                        >
                    </li>

                    <li class="nav-item">
                        <router-link
                            :to="{ name: 'auth.login' }"
                            class="primary-a nav-link"
                            >Iniciar sesión</router-link
                        >
                    </li>
                    <li class="">
                        <router-link class="" to="/register">
                            <Button
                                label="Registro"
                                class="btn-header-secondary"
                        /></router-link>
                    </li>

                    <li v-if="authStore().user?.name" class="nav-item dropdown">
                        <a
                            class="primary-link dropdown-toa"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ authStore().user?.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <router-link class="dropdown-item" to="/admin"
                                    >Admin</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    to="/admin/posts"
                                    class="dropdown-item"
                                    >Post</router-link
                                >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="javascript:void(0)"
                                    @click="logout"
                                    >Logout</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import useAuth from "@/composables/auth";
import LocaleSwitcher from "../components/LocaleSwitcher.vue";
import { authStore } from "../store/auth";
import SVGLogo from "../components/SVGLogo.vue";

const { processing, logout } = useAuth();
</script>

<style scoped>
.bg-nav-color {
    background-color: black;
}
.nav-link {
    color: white;
    font-weight: 600;
}
</style>

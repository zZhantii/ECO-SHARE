<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img src="../../../public/images/Logo_es.svg" alt="logo" />
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">

            <div class="dropdown">
                <button class="p-link layout-topbar-button layout-topbar-button-c" type="button"
                    @click="toggleDropdown">
                    <i class="pi pi-user"></i>
                    <span class="ms-2">Hola, {{ authStore().user.name }}</span>
                </button>

                <ul class="dropdown-menu" :class="{ 'show': isDropdownOpen }">
                    <li>
                        <router-link :to="{ name: '/profile' }" class="dropdown-item" @click="closeDropdown">
                            <i class="pi pi-user mr-2"></i>Perfil
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'home' }" class="dropdown-item" @click="closeDropdown">
                            <i class="pi pi-home mr-2"></i>Home
                        </router-link>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item" :class="{ 'opacity-25': processing }" :disabled="processing" href="#"
                            @click="handleLogout">
                            <i class="pi pi-sign-out mr-2"></i>Cerrar sesión
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLayout } from '../composables/layout';
import useAuth from "@/composables/auth";
import {  useRouter } from "vue-router";
import { authStore } from "../store/auth";

const { onMenuToggle } = useLayout();
const { processing, logout } = useAuth();
const topbarMenuActive = ref(false);
const router = useRouter();

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
};

const handleLogout = async () => {
    closeDropdown();
    await logout();
    router.push('/');
};

onMounted(() => {
    document.addEventListener('click', (event) => {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            isDropdownOpen.value = false;
        }
    });
});
</script>

<style lang="scss" scoped>
.layout-topbar-button-c,
.layout-topbar-button-c:hover {
    width: auto;
    background-color: rgb(255, 255, 255, 0);
    border: 0;
    border-radius: 0%;
    padding: 1em;
}

.dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    min-width: 200px;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);

    &.show {
        display: block;
    }
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    color: #212529;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;

    &:hover {
        background-color: #f8f9fa;
    }
}

.layout-topbar-logo {
    width: 75px;
}
</style>

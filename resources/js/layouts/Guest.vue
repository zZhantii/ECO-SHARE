<template>
    <div>
        <header v-if="!hideHeader">
            <Navbar />
        </header>

        <router-view></router-view>

        <AppFooter v-if="!hideFooter"></AppFooter>
    </div>
</template>
<script setup>
import Navbar from "./Nav.vue";
import AppFooter from "./AppFooter.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Variables para ocultar el header y el footer
const hideHeader = ref(false);
const hideFooter = ref(false);

const visibilityRoute = () => {
    const [firstPart, routeName] = route.name.split(".");
    console.log(routeName);

    const routeNames = ["register", "login"];

    // Si la ruta es register, oculta el header y el footer
    if (routeNames.includes(routeName)) {
        hideHeader.value = true;
        hideFooter.value = true;
    } else {
        hideHeader.value = false;
        hideFooter.value = false;
    }
};

onMounted(visibilityRoute);

// Ver los cambios cuando cambia de ruta
watch(route, visibilityRoute);
</script>

<style scoped>
.container-register {
    display: flex;
    align-items: center;
    min-height: 100vh;
}
</style>

<template>
    <div>
        <header v-if="!hideHeader"><Navbar /></header>

        <router-view></router-view>

        <AppFooter v-if="!hideHeader"></AppFooter>
    </div>
</template>
<script setup>
import Navbar from "./Nav.vue";
import AppFooter from "./AppFooter.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Variables para ocultar el header y el footer
const hideHeader = ref(false);
const hideFooter = ref(false);

onMounted(() => {
    // Coger la ruta actual
    const [firstPart, routeName] = route.name.split(".");
    // console.log(routeName);

    // Si la ruta es register, oculta el header y el footer
    if (routeName === "register") {
        hideHeader.value = true;
        hideFooter.value = true;
    } else {
        hideHeader.value = false;
        hideFooter.value = false;
    }
});
</script>

<style scoped>
.container-register {
    display: flex;
    align-items: center;
    min-height: 100vh;
}
</style>

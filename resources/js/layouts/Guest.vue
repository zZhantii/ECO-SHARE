<template>
    <div>
        <Navbar />

        <main>
            <router-view></router-view>
        </main>

        <AppFooter></AppFooter>
    </div>
</template>
<script setup>
import Navbar from "./Nav.vue";
import AppFooter from "./AppFooter.vue";
</script>

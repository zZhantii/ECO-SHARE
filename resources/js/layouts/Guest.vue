<template>
    <div>
        <header><Navbar /></header>

        <router-view></router-view>

        <AppFooter></AppFooter>
    </div>
</template>
<script setup>
import Navbar from "./Nav.vue";
import AppFooter from "./AppFooter.vue";
</script>

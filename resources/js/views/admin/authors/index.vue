<!-- Codigo HTML -->
<template>
    <h1>Hola</h1>
    <h2>{{ test }}</h2>
    <input type="text" name="" id="" v-model="test" />
</template>

<!-- Codigo JS -->
<script>
import { ref } from "vue";

const test = ref("Hola Mundo");

onMounted(() => {
    console.log("Hola");
});
</script>

<!-- Codigo CSS (Scoped solo afectara a los componentes de este archivo) -->
<style scoped></style>

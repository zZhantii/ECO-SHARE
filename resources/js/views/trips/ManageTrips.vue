<template>
    <main class="container">
        <div class="container mt-5 d-flex flex-column align-items-center">
            <div class="gradient-img"></div>
            <h1 class="fs-2">Revisa aquí tus próximos viajes</h1>
        </div>
    </main>
</template>
<script setup></script>
<style scoped>
.gradient-img {
    height: 17rem;
    width: 17rem;
    background: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.9),
            rgba(0, 0, 0, 0)
        ),
        url("/images/your_trips.webp");
    background-size: cover;
    background-position: center;
    border-radius: 10px;
}
main {
    min-height: 74vh;
}
</style>

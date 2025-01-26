<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8"><h2>Editar Autores</h2></div>
                    </div>

                    <div class="mb-3">
                        <label for="id" class="form-label">ID</label>
                        <input
                            type="text"
                            class="form-control"
                            id="id"
                            readonly
                            v-model="id"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            v-model="author.name"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="surname" class="form-label">Apellido</label>
                        <input
                            type="text"
                            class="form-control"
                            id="surname"
                            v-model="author.surname"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="author.email"
                        />
                    </div>

                    <button type="submit" class="btn btn-primary" @click="">
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const author = ref({});
onMounted(() => {
    axios.get(`/api/author/${id}`).then((response) => {
        author.value = response.data.data;
    });
});
</script>
<style scoped></style>

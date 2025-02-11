<template setup>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="table-title">
                    {{ author }}
                    <div class="row">
                        <div class="col-sm-8"><h2>Editar Autores</h2></div>
                    </div>

                    <div class="mb-3">
                        <label for="id" class="form-label">ID</label>
                        <input
                            type="text"
                            class="form-control"
                            id="id"
                            v-model="author.id"
                            readonly
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
                            v-model="author.lastname"
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

                    <button
                        type="submit"
                        class="btn btn-primary"
                        @click="updateAuthor()"
                    >
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
import * as yup from "yup";

const route = useRoute();
const schema = yup.object({
    id: yup.number().required(),
    name: yup.string().required().max(50),
    surname: yup.string().required().min(3),
    email: yup.string().email().required(),
});

onMounted(() => {
    console.log(route.params.id);

    axios.get("api/author/" + route.params.id).then((response) => {
        author.value = response.data.data;
    });
});

const updateAuthor = async () => {
    console.log("updateAuthor");

    axios
        .put("api/author/" + route.params.id, $author.value)
        .then((response) => {
            author.value = response.data.data;
        });
};
</script>

<style scoped></style>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8"><h2>Autores</h2></div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-info add-new">
                                <i class="fa fa-plus"></i> Nuevo Autor
                            </button>
                        </div>
                    </div>
                </div>

                <DataTable
                    :value="authors"
                    paginator
                    :rows="5"
                    :rowsPerPageOptions="[3, 5, 10, 20, 50]"
                    tableStyle="min-width: 50rem"
                >
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column field="surname" header="Apellido"></Column>
                    <Column field="email" header="Email"></Column>
                </DataTable>

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="author in authors">
                            <td>{{ author.id }}</td>
                            <td>{{ author.name }}</td>
                            <td>{{ author.surname }}</td>
                            <td>{{ author.email }}</td>
                            <td>
                                <a class="me-2"><i class="pi pi-pencil"></i></a>
                                <a><i class="pi pi-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const authors = ref([]);
onMounted(() => {
    axios.get("/api/author").then((response) => {
        authors.value = response.data.data;
        console.log(response.data.data);
    });
});
</script>

<style scoped></style>

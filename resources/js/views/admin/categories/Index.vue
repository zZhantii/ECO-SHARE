<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">

                <div class="card-header bg-transparent ps-0 pe-0">
                    <h5 class="float-start mb-0">Categorías Ejercicios</h5>
                </div>

                <DataTable  :value="categories.data" v-model:filters="filters" paginator :rows="15" stripedRows dataKey="id" size="small">

                    <template #header>

                        <Toolbar pt:root:class="toolbar-table">
                            <template #start>
                                <IconField >
                                    <InputIcon class="pi pi-search"> </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Buscar" class="mr-1"/>
                                </IconField>

                                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="initFilters()" />
                                <Button type="button" icon="pi pi-refresh" class="h-100 ml-1" outlined @click="getGroups()" />
                            </template>

                            <template #end>
                                <Button v-if="can('category-create')"  @click="$router.push('categories/create')" icon="pi pi-external-link" label="Crear Categoria" class="float-end" />
                            </template>
                        </Toolbar>
                    </template>

                    <template #empty> No customers found. </template>

                    <Column field="id" header="ID" sortable>
                        <template #body="{ data }">
                            {{ data.id }}
                        </template>
                    </Column>
                    <Column field="name" header="name" sortable></Column>
                    <Column class="pe-0 me-0 icon-column-2">
                        <template #body="slotProps">

                            <!--TODO Falta permisos-->
                            <router-link  :to="{ name: 'categories.edit', params: { id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" severity="info" size="small" class="mr-1"/>
                            </router-link>

                            <Button icon="pi pi-trash" severity="danger" v-if="can('category-delete')" @click.prevent="deleteCategory(slotProps.data.id)" size="small"/>
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>


</template>

<script setup>
    import {ref, onMounted, watch} from "vue";
    import useCategories from "../../../composables/categories";
    import {useAbility} from '@casl/vue'
    import {FilterMatchMode} from "@primevue/core/api";

    const {categories, getCategories, deleteCategory} = useCategories()
    const {can} = useAbility()

    onMounted(() => {
        getCategories()
    })

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    })

    const initFilters = () => {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
    }

</script>

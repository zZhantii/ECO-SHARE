<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 rounded-4 ">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Crear Etiqueta</h2>
                        <span class="text-600 font-medium">Por favor, ingrese el nombre de la etiqueta</span>
                    </div>

                    <div class="mb-4">
                        <label for="tag_name" class="block text-900 font-medium mb-2">Nombre de la Etiqueta</label>
                        <InputText v-model="tag.tag_name" id="tag_name" type="text" class="w-full"
                            :class="{ 'p-invalid': validationErrors.tag_name }"
                            placeholder="Ingrese el nombre de la etiqueta" />
                        <small v-if="validationErrors.tag_name" class="p-error block mt-1">
                            <div v-for="message in validationErrors.tag_name" :key="message">{{ message }}</div>
                        </small>
                    </div>

                    <div class="flex justify-content-end">
                        <Button label="Cancelar" class="p-button-text mr-2" @click="router.back()" />
                        <Button label="Guardar" icon="pi pi-check" :loading="loading" @click="submitAddTag" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup>
// VUE
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Composables
import useTags from "@/composables/tags";

const { createTag, tagSchema, validationErrors } = useTags();

const tag = ref({
    tag_name: null
})

const submitAddTag = async () => {
    try {
        await tagSchema.validate(tag.value, { abortEarly: false })
            .then(() => {
                createTag(tag);
            })
        router.back();
    } catch (error) {
        if (error.inner) {
            validationErrors.value = {}
            error.inner.forEach((e) => {
                if (!validationErrors.value[e.path]) {
                    validationErrors.value[e.path] = [];
                }
                validationErrors.value[e.path].push(e.message);
            });
        }
    }
}
</script>

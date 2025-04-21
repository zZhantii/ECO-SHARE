<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid">
            <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <div class="surface-card p-4 shadow-2 rounded-4 ">
                    <div class="text-center mb-5">
                        <h2 class="text-3xl font-medium text-900 mb-3">Editar Etiqueta</h2>
                        <span class="text-600 font-medium">Modifique el nombre de la etiqueta</span>
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
                        <Button label="Actualizar" icon="pi pi-check" :loading="loading" class="p-button-success"
                            @click="submitUpdateTag" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const route = useRoute();
const router = useRouter();

// Composables
import useTags from "@/composables/tags";

const { updateTag, getTagWithID, tag, tagSchema, validationErrors } = useTags();


onMounted(async () => {
    await getTagWithID(route.params.id);
})

const submitUpdateTag = async () => {
    try {
        tagSchema.validate(tag.value, {abortEarly: false})
        .then(() => {
            updateTag(tag);
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

<style>
.fu-content {
    padding: 0px !important;
    border: 0px !important;
    border-radius: 6px;
}

.fu-header {
    border: 0px !important;
    border-radius: 6px;
}

.fu {
    display: flex;
    flex-direction: column-reverse;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}


.img-profile {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    aspect-ratio: 1/1;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    margin-bottom: 0.3rem;
}
</style>

<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-2 text-primary">Crear Etiqueta</h4>
                    <div class="form-group my-5">
                        <label for="tag_name">Tag Name</label>
                        <InputText v-model="tag.tag_name" type="text" class="d-flex w-100 w-100" id="tag_name" />
                        <div v-if="validationErrors.tag_name" class="text-danger mt-1">
                            <div v-for="message in validationErrors.tag_name" :key="message">{{ message }}</div>
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="submitAddTag">Guardar</button>

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
                return createTag(tag);
            })
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

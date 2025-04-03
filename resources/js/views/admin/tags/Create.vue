<template>
    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="mb-2 text-primary">Crear Etiqueta</h6>
                    <div class="form-group">
                        <label for="tag_name">Tag Name</label>
                        <InputText v-model="tag.tag_name" type="text" class="d-flex w-100 w-100" id="tag_name" />
                        <!-- <div class="text-danger mt-1">{{ errors.name }}</div>
                        <div class="text-danger mt-1">
                            <div v-for="message in validationErrors?.name">
                                {{ message }}
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" @click="submitAddTag">Guardar</button>
    <Toast />
</template>
<script setup>
// VUE
import { ref } from "vue";

// Composables
import useTags from "@/composables/tags";

const { createTag, tagSchema } = useTags();

const tag = ref({
    tag_name: null
})

const submitAddTag = async () => {
    await tagSchema.validate(tag, {abortEarly: false})
    .then(() => {
        createTag(tag);
    })
}
</script>

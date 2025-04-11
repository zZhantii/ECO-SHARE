<template>

    <div class="grid">

        <div class="col-12 md:col-8 lg:col-8 xl:col-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="mb-2 text-primary">Tags Details</h4>

                    <div class="form-group mb-5">
                        <label for="tag_name">Tag_name</label>
                        <InputText v-model="tag.tag_name" type="text" class="d-flex w-100 w-100" id="plate" />
                        <div v-if="validationErrors.tag_name" class="text-danger mt-1">
                            <div v-for="message in validationErrors.tag_name" :key="message">{{ message }}
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="submitUpdateTag">Guardar</button>

                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
// VUE
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import * as yup from "yup";
import { es } from "yup-locales";

yup.setLocale(es);
const route = useRoute();

// Composables
import useTags from "@/composables/tags";

const { updateTag, getTagWithID, tag, tagSchema, validationErrors } = useTags();


onMounted(async () => {
    await getTagWithID(route.params.id);
})

const submitUpdateTag = async () => {
    try {
        tagSchema.validate(tag.valueº, {abortEarly: false})
        .then(() => {
            updateTag(tag);
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

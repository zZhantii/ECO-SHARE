<template>
    <form
        id="trip-finder"
        class="d-flex flex-row justify-content-around align-items-center gap-2"
        action=""
    >
        <IconField class="w-25 ms-2">
            <InputIcon class="ms-2 pi pi-circle" />
            <InputText
                type="text"
                v-model="value"
                placeholder="De"
                class="rm-border ms-2 w-100"
            />
        </IconField>
        <IconField class="w-25 me-2">
            <InputIcon class="ms-2 pi pi-circle" />
            <InputText
                type="text"
                v-model="value"
                placeholder="A"
                class="rm-border ms-2 w-100"
            />
        </IconField>
        <IconField class="w-25 me-2">
            <DatePicker
                v-model="date"
                class="w-100 rm-border"
                placeholder="Fecha"
                showIcon
                iconDisplay="input"
            />
        </IconField>

        <IconField class="w-25 me-2">
            <InputNumber
                v-model="value"
                inputId="minmax-buttons"
                showButtons
                placeholder="Pasajeros"
                :min="0"
                :max="4"
                fluid
            />
        </IconField>

        <Button label="Buscar" class="btn-trip-finder w-25" />
    </form>
</template>
<script setup>
import { ref } from "vue";

const date = ref("");
const value = ref();
</script>

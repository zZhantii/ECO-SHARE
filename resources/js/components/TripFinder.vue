<template>
    <form @submit.prevent="submitFinder" id="trip-finder" class="d-block d-md-flex justify-content-between">
        <div
            class="col-none-12 col-md-9 d-block d-md-flex flex-row justify-content-around align-items-center gap-4 p-none-4 p-1 m-1">
            <IconField class="col-none-11 col-md-3 ms-none-0 m-1 p-0">
                <InputIcon class="ms-1 pi pi-circle" />
                <InputText type="text" id="origin" placeholder="De" class="rm-border w-100"
                    :class="{ 'p-invalid': errors.origin }" />
                <small class="p-error" v-if="errors.origin">{{ errors.origin }}</small>
            </IconField>
            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <InputIcon class="ms-1 pi pi-circle" />
                <InputText type="text" placeholder="A" id="destination" class="rm-border w-100"
                    :class="{ 'p-invalid': errors.destination }" />
                <small class="p-error" v-if="errors.destination">{{ errors.destination }}</small>
            </IconField>
            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <DatePicker v-model="date" :min-date="today" class="rm-border w-100" placeholder="Fecha" showIcon
                    iconDisplay="input" :class="{ 'p-invalid': errors.date }" />
                <small class="p-error" v-if="errors.date">{{ errors.date }}</small>
            </IconField>

            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <InputNumber class="rm-border w-100" v-model="passengers" inputId="minmax-buttons" showButtons
                    placeholder="Pasajeros" :min="0" :max="4" fluid :class="{ 'p-invalid': errors.passengers }" />
                <small class="p-error" v-if="errors.passengers">{{ errors.passengers }}</small>
            </IconField>
        </div>
        <Button label="Buscar" type="submit"
            class="col-md-2 d-none d-md-block btn-trip-finder w-none-100 w-md-auto h-100 p-4" />
        <Button label="Buscar" type="submit" class="col-none-2 d-block d-md-none btn-trip-finder-phone w-100 p-3" />
    </form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';

const schema = yup.object().shape({
    origin: yup.object().required('El origen es obligatorio'),
    destination: yup.object().required('El destino es obligatorio'),
    date: yup.date().required('La fecha es obligatoria'),
    passengers: yup.number()
        .required('El número de pasajeros es obligatorio')
        .min(1, 'Mínimo 1 pasajero'),
});

const router = useRouter();
const toast = useToast();

const errors = ref({});
const destination = ref(null);
const origin = ref(null);
const date = ref(null);
const passengers = ref(null);
const data = ref({});
const today = ref(new Date());

const submitFinder = async () => {
    try {
        await schema.validate({
            origin: origin.value?.getPlace(),
            destination: destination.value?.getPlace(),
            date: date.value,
            passengers: passengers.value
        }, { abortEarly: false });

        errors.value = {};

        const selectedDate = new Date(date.value);
        selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
        const formattedDate = selectedDate.toISOString().split("T")[0];

        data.value = {
            origin: origin.value.getPlace(),
            destination: destination.value.getPlace(),
            date: formattedDate,
            passengers: passengers.value
        }

        router.push({
            name: "TripsIndex",
            query: { data: JSON.stringify(data.value) },
        });
    } catch (error) {
        errors.value = error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
        }, {});

        toast.add({
            severity: 'error',
            summary: 'Error de validación',
            detail: 'Por favor, complete todos los campos correctamente',
            life: 3000
        });
    }
  
};


onMounted(() => {
    origin.value = new google.maps.places.Autocomplete(
        document.getElementById("origin"),
        {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "icon", "name"],
        }
    );
    destination.value = new google.maps.places.Autocomplete(
        document.getElementById("destination"),
        {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "icon", "name"],
        }
    );
});
</script>
<style scoped>
#trip-finder {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    box-shadow: #00000011 2px 2px 2px 1px;
}

.btn-trip-finder {
    padding: 10px 15px;
    border-radius: 10px !important;
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
    background-color: #02aef8 !important;
    border: none !important;
}

.btn-trip-finder-phone {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    background-color: #02aef8 !important;
    border: none !important;
}

.btn-trip-finder:hover {
    background-color: #054851 !important;
}
.p-invalid {
    border-color: #dc3545 !important;
}

.p-error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>

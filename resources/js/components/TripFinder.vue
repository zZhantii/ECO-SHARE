<template>
    <form
        @submit.prevent="submitFinder"
        id="trip-finder"
        class="d-block d-md-flex justify-content-between"
    >
        <div
            class="col-none-12 col-md-9 d-block d-md-flex flex-row justify-content-around align-items-center gap-4 p-none-4 p-1 m-1"
        >
            <IconField class="col-none-11 col-md-3 ms-none-0 m-1 p-0">
                <InputIcon class="ms-1 pi pi-circle" />
                <InputText
                    type="text"
                    id="origin"
                    placeholder="De"
                    class="rm-border w-100"
                />
            </IconField>
            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <InputIcon class="ms-1 pi pi-circle" />
                <InputText
                    type="text"
                    placeholder="A"
                    id="destination"
                    class="rm-border w-100"
                />
            </IconField>
            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <DatePicker
                    v-model="date"
                    :min-date="today"
                    class="rm-border w-100"
                    placeholder="Fecha"
                    showIcon
                    iconDisplay="input"
                />
            </IconField>

            <IconField class="col-none-11 col-md-3 p-0 m-1">
                <InputNumber
                    class="rm-border w-100"
                    v-model="passengers"
                    inputId="minmax-buttons"
                    showButtons
                    placeholder="Pasajeros"
                    :min="0"
                    :max="4"
                    fluid
                />
            </IconField>
        </div>
        <Button
            label="Buscar"
            type="submit"
            class="col-md-2 d-none d-md-block btn-trip-finder w-none-100 w-md-auto h-100 p-4"
        />
        <Button
            label="Buscar"
            type="submit"
            class="col-none-2 d-block d-md-none btn-trip-finder-phone w-100 p-3"
        />
    </form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const destination = ref(null);
const origin = ref(null);
const date = ref(null);
const passengers = ref(null);
const data = ref({});
const today = ref(new Date());

const submitFinder = () => {
    const selectedDate = new Date(date.value);

    // Zona horaria local
    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());

    // fecha en 'YYYY-MM-DD'
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
</style>

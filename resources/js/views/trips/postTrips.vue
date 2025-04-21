<template>
    <div class="show"></div>
    <div class="container">
        <div class="mt-4"><h1 class="fs-3 mb-0">Publicación de viajes</h1></div>
        <div class="row justify-content-center">
            <div v-if="show" class="card flex justify-center m-4 p-4">
                <Stepper value="1">
                    <StepList class="StepList">
                        <Step value="1">Opciones de viajes</Step>
                        <Step value="2">Detalles del vehiculo</Step>
                        <Step value="3">Resumen del viaje</Step>
                    </StepList>
                    <StepPanels>
                        <StepPanel v-slot="{ activateCallback }" value="1">
                            <div
                                class="flex-auto d-flex justify-content-center"
                            >
                                <Toast />
                                <form
                                    @submit.prevent="saveOption"
                                    class="w-100"
                                >
                                    <div class="row">
                                        <Map
                                            v-if="showFirstMap"
                                            :origin="tripData.start_point"
                                            :destination="tripData.end_point"
                                            @updateMapsInfo="handleMapsInfo"
                                        />
                                    </div>

                                    <div class="row mt-4">
                                        <div
                                            class="col-sm-12 col-md-6 mb-3 mb-md-0"
                                        >
                                            <div class="d-flex flex-column">
                                                <div class="mb-3">
                                                    <h3
                                                        class="text-center text-md-start"
                                                    >
                                                        ¿De dónde sales?
                                                    </h3>
                                                    <InputText
                                                        id="origin"
                                                        type="text"
                                                        placeholder="Inicio"
                                                        class="w-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-12 col-md-6">
                                            <div class="d-flex flex-column">
                                                <div class="mb-3">
                                                    <h3
                                                        class="text-center text-md-start"
                                                    >
                                                        ¿A dónde vas?
                                                    </h3>
                                                    <InputText
                                                        id="destination"
                                                        type="text"
                                                        placeholder="Destino"
                                                        class="w-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="d-flex pt-4 justify-content-end"
                                    >
                                        <Button
                                            label="Siguiente"
                                            type="submit"
                                            class="primary-a"
                                            icon="pi pi-arrow-right"
                                            :disabled="!isStep1Complete"
                                            iconPos="right"
                                            @click="activateCallback('2')"
                                        />
                                    </div>
                                </form>
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="2">
                            <div
                                class="flex-auto d-flex justify-content-center"
                            >
                                <Toast />
                                <form
                                    @submit.prevent="saveOptionCar"
                                    class="w-100"
                                >
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-6">
                                            <div class="card h-100">
                                                <div
                                                    class="card-body d-flex flex-column"
                                                >
                                                    <h3
                                                        class="card-title text-center mb-4"
                                                    >
                                                        ¿Qué vehículo
                                                        utilizarás?
                                                    </h3>
                                                    <div class="mt-auto">
                                                        <FloatLabel
                                                            variant="on"
                                                        >
                                                            <Select
                                                                v-model="
                                                                    tripData.vehicle_id
                                                                "
                                                                inputId="vehicle_select"
                                                                :options="
                                                                    vehiclesList
                                                                "
                                                                optionValue="id"
                                                                optionLabel="brand"
                                                                class="w-100"
                                                                appendOn=".show"
                                                            />
                                                            <label
                                                                for="vehicle_select"
                                                                >Seleccione su
                                                                vehículo</label
                                                            >
                                                        </FloatLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-12 col-md-6">
                                            <div class="card h-100">
                                                <div
                                                    class="card-body d-flex flex-column"
                                                >
                                                    <h3
                                                        class="card-title text-center mb-4"
                                                    >
                                                        ¿Cuándo viajarás?
                                                    </h3>
                                                    <div class="mt-auto">
                                                        <DatePicker
                                                            id="departure_time"
                                                            v-model="
                                                                tripData.departure_time
                                                            "
                                                            showTime
                                                            :min-date="today"
                                                            hourFormat="24"
                                                            class="w-100"
                                                            fluid
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-12 col-md-6">
                                            <div class="card h-100">
                                                <div
                                                    class="card-body d-flex flex-column"
                                                >
                                                    <h3
                                                        class="card-title text-center mb-4"
                                                    >
                                                        ¿Cuántos asientos hay
                                                        disponibles?
                                                    </h3>
                                                    <div class="mt-auto">
                                                        <InputNumber
                                                            v-model="
                                                                tripData.available_seats
                                                            "
                                                            inputId="available_seats"
                                                            mode="decimal"
                                                            showButtons
                                                            :min="1"
                                                            :max="seats"
                                                            class="w-100"
                                                            fluid
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-12 col-md-6">
                                            <div class="card h-100">
                                                <div
                                                    class="card-body d-flex flex-column"
                                                >
                                                    <h3
                                                        class="card-title text-center mb-4"
                                                    >
                                                        ¿Tienes alguna
                                                        restricción para este
                                                        viaje?
                                                    </h3>
                                                    <div class="mt-auto">
                                                        <MultiSelect
                                                            v-model="
                                                                selectedTags
                                                            "
                                                            inputId="restrictions"
                                                            :options="tagList"
                                                            optionLabel="tag_name"
                                                            filter
                                                            :maxSelectedLabels="
                                                                3
                                                            "
                                                            class="w-100"
                                                            variant="filled"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="d-flex justify-content-between pt-6"
                                    >
                                        <Button
                                            label="Atrás"
                                            severity="secondary"
                                            icon="pi pi-arrow-left"
                                            @click="
                                                activateCallback('1'),
                                                    (showFirstMap = true)
                                            "
                                        />
                                        <Button
                                            label="Siguiente"
                                            type="submit"
                                            class="primary-a"
                                            icon="pi pi-arrow-right"
                                            :disabled="!isStep2Complete"
                                            iconPos="right"
                                            @click="
                                                activateCallback('3'),
                                                    (showFirstMap = false)
                                            "
                                        />
                                    </div>
                                </form>
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="3">
                            <div class="row g-4">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <Map
                                                v-if="!showFirstMap"
                                                :origin="tempStartPoint"
                                                :destination="tempEndPoint"
                                                @updateMapsInfo="handleMapsInfo"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-4">
                                <div class="col-sm-12">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h2
                                                class="card-title text-center text-md-start mb-4 fw-bold"
                                            >
                                                ¡Resumen del viaje!
                                            </h2>

                                            <!-- Contenedor de detalles responsive - En móvil se apilan, en desktop una al lado de otra -->
                                            <div class="row">
                                                <!-- Detalles del vehículo -->
                                                <div
                                                    class="col-sm-12 col-md-6 mb-0"
                                                >
                                                    <div
                                                        class="p-3 bg-light rounded-3 h-100"
                                                    >
                                                        <h4
                                                            class="mb-3 fw-semibold"
                                                        >
                                                            Detalles del
                                                            vehículo
                                                        </h4>

                                                        <ul
                                                            class="list-unstyled d-flex flex-column gap-3"
                                                        >
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-car-front me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        selectedVehicleDetails.brand
                                                                            ? `Marca:                                                                    ${selectedVehicleDetails.brand}`
                                                                            : "Marca no                                                                    disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-info-circle me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        selectedVehicleDetails.model
                                                                            ? `Modelo:
                                                                    ${selectedVehicleDetails.model}`
                                                                            : "Modelo no                                                                    disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-bookmark me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        selectedVehicleDetails.plate
                                                                            ? `Matrícula:                                                                    ${selectedVehicleDetails.plate}`
                                                                            : "Matrícula no                                                                    disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-fuel-pump me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        selectedVehicleDetails.consumption
                                                                            ? `Consumo:                                                                    ${selectedVehicleDetails.consumption} L / 100 Km`
                                                                            : "Consumo no disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-people me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        tripData.available_seats
                                                                            ? `Número de asientos:                                                                    ${tripData.available_seats}`
                                                                            : "Número de asientos                                                                    no disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    selectedVehicleDetails
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-droplet me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    {{
                                                                        selectedVehicleDetails.fuel_type
                                                                            ? `Tipo de                                                                    gasolina: ${selectedVehicleDetails.fuel_type}`
                                                                            : "Tipo de gasolina no disponible"
                                                                    }}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div class="col-sm-12 col-md-6">
                                                    <div
                                                        class="p-3 bg-light rounded-3 h-100"
                                                    >
                                                        <h4
                                                            class="mb-3 fw-semibold"
                                                        >
                                                            Detalles del viaje
                                                        </h4>
                                                        <ul
                                                            class="list-unstyled d-flex flex-column gap-3"
                                                        >
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-geo-alt me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    Origen:
                                                                    {{
                                                                        tripData
                                                                            .start_point
                                                                            .address ===
                                                                        tripData
                                                                            .start_point
                                                                            .locality
                                                                            ? tripData
                                                                                  .start_point
                                                                                  .locality
                                                                            : tripData
                                                                                  .start_point
                                                                                  .address +
                                                                              ", " +
                                                                              tripData
                                                                                  .start_point
                                                                                  .locality
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-geo me-2 text-primary"
                                                                ></i>
                                                                <span>
                                                                    Destino:
                                                                    {{
                                                                        tripData
                                                                            .end_point
                                                                            .address ===
                                                                        tripData
                                                                            .end_point
                                                                            .locality
                                                                            ? tripData
                                                                                  .end_point
                                                                                  .locality
                                                                            : tripData
                                                                                  .end_point
                                                                                  .address +
                                                                              ", " +
                                                                              tripData
                                                                                  .end_point
                                                                                  .locality
                                                                    }}
                                                                </span>
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-calendar-date me-2 text-primary"
                                                                ></i>
                                                                <span
                                                                    >Fecha de
                                                                    inicio:
                                                                    {{
                                                                        formattedDate
                                                                    }}</span
                                                                >
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-clock me-2 text-primary"
                                                                ></i>
                                                                <span
                                                                    >Hora de
                                                                    salida:
                                                                    {{
                                                                        tripData.departure_time
                                                                    }}</span
                                                                >
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-clock-history me-2 text-primary"
                                                                ></i>
                                                                <span
                                                                    >Hora
                                                                    estimada de
                                                                    llegada:
                                                                    {{
                                                                        tripData.arrival_time
                                                                    }}</span
                                                                >
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-signpost-split me-2 text-primary"
                                                                ></i>
                                                                <span
                                                                    >Distancia:
                                                                    {{
                                                                        distance
                                                                    }}
                                                                    Km</span
                                                                >
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    tripData
                                                                        .tags
                                                                        .length >
                                                                    0
                                                                "
                                                                class="d-flex align-items-start"
                                                            >
                                                                <i
                                                                    class="bi bi-tags me-2 text-primary"
                                                                ></i>
                                                                <div>
                                                                    <span
                                                                        >Reglas
                                                                        de
                                                                        viaje:</span
                                                                    >
                                                                    <ul
                                                                        class="list-unstyled mt-1 ms-2"
                                                                    >
                                                                        <li
                                                                            v-for="tag in selectedTags"
                                                                            class="mb-1"
                                                                        >
                                                                            <span
                                                                                class="badge bg-secondary"
                                                                                >{{
                                                                                    tag.tag_name
                                                                                }}</span
                                                                            >
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li
                                                                class="d-flex align-items-start mt-2"
                                                            >
                                                                <i
                                                                    class="bi bi-cash-coin me-2 text-success"
                                                                ></i>
                                                                <span
                                                                    class="fs-4 fw-bold"
                                                                >
                                                                    {{
                                                                        tripData.price >
                                                                        7
                                                                            ? `Precio: ${tripData.price}`
                                                                            : `Tarifa mínima aplicada: ${
                                                                                  tripData.price ??
                                                                                  ""
                                                                              }`
                                                                    }}
                                                                    €
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between pt-6">
                                <Button
                                    label="Atrás"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="
                                        activateCallback('2'),
                                            (isStep2Complete = false)
                                    "
                                />
                                <Button
                                    label="Confirmar Viaje"
                                    @click="handlePost"
                                    class="primary-a"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                />
                            </div>
                        </StepPanel>
                    </StepPanels>
                </Stepper>
            </div>
        </div>
    </div>
</template>

<script setup>
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";

// Form
import * as yup from "yup";
import { ar, de, es, tr } from "yup-locales";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import { authStore } from "../../store/auth";
import Map from "@/components/Map.vue";
import useTags from "@/composables/tags";

// DataBase
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// composables
import useVehicles from "@/composables/vehicles.js";
import useTrips from "../../composables/trips";

const { postTrips } = useTrips();
const { getVehicles, vehiclesList, vehicle, getVehicle } = useVehicles();

const { getTags, tag, tagList } = useTags();
const router = useRouter();
const tempStartPoint = ref({});
const tempEndPoint = ref({});
const showFirstMap = ref(true);
const toast = useToast();
const seats = ref(0);
const formattedDate = ref("");
const distance = ref(0);
const dieselRate = ref(0);
const gasolineRate = ref(0);
const start_locality = ref("");
const end_locality = ref("");
const today = ref(new Date());
const selectedTags = ref([]);
const show = ref(true);

let user_id = ref(0);
user_id.value = authStore().user.id;

onMounted(async () => {
    getVehicles();
    today.value.setDate(today.value.getDate() + 1);

    const autocompleteStart = new google.maps.places.Autocomplete(
        document.getElementById("origin"),
        {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "icon", "name"],
        }
    );
    autocompleteStart.addListener("place_changed", () => {
        tripData.value.start_point = autocompleteStart.getPlace();
        tempStartPoint.value = autocompleteStart.getPlace();
        for (const element of tempStartPoint.value.address_components) {
            if (element.types.includes("locality")) {
                start_locality.value = element.long_name;
            }
        }
    });

    const autocompleteEnd = new google.maps.places.Autocomplete(
        document.getElementById("destination"),
        {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "icon", "name"],
        }
    );
    autocompleteEnd.addListener("place_changed", () => {
        tripData.value.end_point = autocompleteEnd.getPlace();
        tempEndPoint.value = autocompleteEnd.getPlace();
        for (const element of tempEndPoint.value.address_components) {
            if (element.types.includes("locality")) {
                end_locality.value = element.long_name;
            }
        }
    });
    getFuelRates();
    getTags();
});

onBeforeUnmount(() => {
    show.value = false;
});

const tripData = ref({
    user_id: user_id.value,
    start_point: "",
    end_point: "",
    departure_time: "",
    arrival_time: "",
    vehicle_id: null,
    available_seats: null,
    price: null,
    tags: [],
});

function handlePost() {
    tripData.value.user_id = user_id.value;
    postTrips(tripData.value);
    router.push({ name: "ManageTrips" });
}
const selectedVehicleDetails = ref(null);

watch(
    () => tripData.value.vehicle_id,
    async (id) => {
        if (id) {
            router.push({ query: { vehicle: id } });
            await findVehicleById(id);
        } else {
            selectedVehicleDetails.value = null;
        }
    }
);

const nextStep = (step, condition, activateCallback) => {
    if (condition) {
        activateCallback(step);
    }
};

const isStep1Complete = computed(() => {
    return tripData.value.start_point !== "" && tripData.value.end_point !== "";
});

const isStep2Complete = computed(() => {
    return (
        tripData.value.vehicle_id !== null &&
        tripData.value.vehicle_id > 0 &&
        tripData.value.available_seats !== null &&
        tripData.value.available_seats > 0 &&
        tripData.value.departure_time != ""
    );
});

const findVehicleById = async (id) => {
    await getVehicle(id);
    selectedVehicleDetails.value = vehicle.value;
    seats.value = vehicle.value.pax_number;
};

// const useGeocoder = (place, point) => {
//     console.log("Geocoding:", place);

//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ location: place }, (results, status) => {
//         if (status === google.maps.GeocoderStatus.OK) {
//             const addressComponents = results[0].address_components;
//             console.log("Componente 0 desde Geocoding:", addressComponents);
//             for (const element of addressComponents) {
//                 if (element.types.includes("locality")) {
//                     switch (point) {
//                         case "start":
//                             start_locality.value = element.long_name;
//                             console.log(
//                                 "Localidad de inicio:",
//                                 start_locality.value
//                             );
//                             start_locality.value = element.long_name;
//                             break;
//                         case "end":
//                             end_locality.value = element.long_name;
//                             console.log(
//                                 "Localidad de destino:",
//                                 end_locality.value
//                             );
//                             end_locality.value = element.long_name;
//                             break;
//                         default:
//                             console.log("No se ha encontrado la localidad");
//                     }
//                 }
//             }
//         } else {
//             console.error("Geocoding failed:", status);
//         }
//     });
// };

const formatDeparture = () => {
    const date = new Date(tripData.value.departure_time);
    formattedDate.value = date.toLocaleDateString("es-ES");
    console.log("Día de salida: ", formattedDate.value);
    let departureTime = new Date(tripData.value.departure_time);
    let arrivalTime = new Date(departureTime);
    let duration = tripData.value.duration;
    let durationInSeconds = parseInt(duration.replace("s", ""));

    arrivalTime.setSeconds(departureTime.getSeconds() + durationInSeconds);

    tripData.value.departure_time = new Date(departureTime)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    tripData.value.arrival_time = new Date(arrivalTime)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
};

const handleDistance = () => {
    const metersDistance = tripData.value.Distance;
    distance.value = Math.round(metersDistance / 1000);
    console.log("Distancia en km:", distance.value);
};

const pointSchema = yup.object().shape({
    start_point: yup.object().required("El punto de inicio es obligatorio"),
    end_point: yup.object().required("El destino es obligatorio"),
});

const handleMapsInfo = (mapsInfo) => {
    tripData.value.start_point = mapsInfo.origin;
    tripData.value.start_point.locality = start_locality.value;
    tripData.value.end_point = mapsInfo.destination;
    tripData.value.end_point.locality = end_locality.value;
    tripData.value.duration = mapsInfo.duration;
    tripData.value.Distance = mapsInfo.distance;
};

const saveOption = async () => {
    try {
        await pointSchema.validate({
            start_point: tripData.value.start_point,
            end_point: tripData.value.end_point,
        });

        toast.add({
            severity: "success",
            summary: "Guardado con éxito",
            detail: `Origen: ${tripData.value.start_point.address} | Destino: ${tripData.value.end_point.address}`,
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
        });
    }
};

const CarSchema = yup.object().shape({
    vehicle_id: yup
        .number()
        .required("El vehículo es obligatorio")
        .min(1, "Debe seleccionar un vehículo válido"),
    available_seats: yup
        .number()
        .required("Debe indicar los asientos disponibles")
        .min(1, "Debe haber al menos un asiento disponible"),
    departure_time: yup.string().required("Debes indicar la hora de salida"),
    arrival_time: yup.string().required("Debes indicar la hora de llegada"),
    tags: yup.array().of(yup.number()),
});

const getFuelRates = async () => {
    //Gasóleo A = id 6
    //Gasolina = id 10
    await fetch(
        "https://api.precioil.es/precios/medios/provincia/2?idFuelType=10"
    )
        .then((response) => response.json())
        .then((data) => (gasolineRate.value = data[0].averagePrice));
    await fetch(
        "https://api.precioil.es/precios/medios/provincia/2?idFuelType=6"
    )
        .then((response) => response.json())
        .then((data) => (dieselRate.value = data[0].averagePrice));
};

const getPrice = () => {
    console.log("detalles del vehiculo", selectedVehicleDetails.value);
    switch (selectedVehicleDetails.value.fuel_type) {
        case "Gasolina":
            tripData.value.price =
                Math.round(
                    (selectedVehicleDetails.value.consumption / 100.0) *
                        gasolineRate.value *
                        distance.value *
                        100
                ) / 100;

            break;
        case "Diésel":
            tripData.value.price =
                Math.round(
                    (selectedVehicleDetails.value.consumption / 100.0) *
                        dieselRate.value *
                        distance.value *
                        100
                ) / 100;
            break;
        default:
            console.log(
                "El tipo de combustible no está definido y se aplica el de gasolina por defecto"
            );
            tripData.value.price = distance.value * gasolineRate;
            break;
    }
    if (tripData.value.price < 7) {
        tripData.value.price = 7.0;
    }
};

const saveOptionCar = async () => {
    formatDeparture();
    handleDistance();
    getPrice();

    for (const element of selectedTags.value) {
        tripData.value.tags.push(element.id);
    }
    console.log("tripData antes de guardar:", tripData.value);

    try {
        await CarSchema.validate({
            vehicle_id: tripData.value.vehicle_id,
            available_seats: tripData.value.available_seats,
            departure_time: tripData.value.departure_time,
            arrival_time: tripData.value.arrival_time,
            departure_date: tripData.value.departure_date,
        });

        toast.add({
            severity: "success",
            summary: "Guardado con éxito",
            detail: `Vehículo: ${tripData.value.vehicle_id} | Asientos: ${tripData.value.available_seats} | Hora de salida: ${tripData.value.departure_time}`,
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
        });
    }
};
</script>

<style scoped>
i {
    font-size: 35px;
    padding-right: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mapTrip {
    max-width: 500px;
    height: 250px;
}
</style>

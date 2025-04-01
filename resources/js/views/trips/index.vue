<template>
    <div class="container">
        <TripFinder class="my-5" />
    </div>

    <div class="container container-responsive d-flex justify-content-between my-5">
        <div class="row w-aside ">
            <div class="col-12 col-md-4">
                <div class="d-flex justify-content-between">
                    <h4>Ordenar Por</h4>
                    <p @click="clearFilters">Borrar Todo</p>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.earlyDeparture" binary />
                    <label for="earlyDeparture" class="w-75 cursor-pointer">Salida más temprano</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256"
                        aria-label="Icono de filtro">
                        <path
                            d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.lateDeparture" binary />
                    <label for="lateDeparture" class="w-75">Salida más tarde</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm62-90a6,6,0,0,1-6,6H128a6,6,0,0,1-6-6V72a6,6,0,0,1,12,0v50h50A6,6,0,0,1,190,128Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.lowestPrice" binary />
                    <label for="lowestPrice" class="w-75"> Precio más bajo </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M224.56,103.81C213.43,97.75,198.47,93.39,182,91.34V84c0-12.12-9.58-23.1-27-30.93C139.16,45.93,118.2,42,96,42S52.84,45.93,37,53.07C19.58,60.9,10,71.88,10,84v40c0,12.12,9.58,23.1,27,30.93,10.49,4.72,23.21,8,37,9.73V172c0,12.12,9.58,23.1,27,30.93C116.84,210.07,137.8,214,160,214s43.16-3.93,59-11.07c17.39-7.83,27-18.81,27-30.93V132C246,121.35,238.39,111.34,224.56,103.81Zm-5.74,10.54C228.61,119.68,234,126,234,132c0,14.19-30.39,30-74,30a166.9,166.9,0,0,1-21.21-1.34A110.79,110.79,0,0,0,155,154.93c17.39-7.83,27-18.81,27-30.93V103.43C196.4,105.36,209.3,109.16,218.82,114.35ZM108.16,153.58c-3.92.27-8,.42-12.16.42-5.3,0-10.4-.24-15.28-.67a2.22,2.22,0,0,0-.37,0c-3.58-.33-7-.77-10.35-1.3V124.12A178,178,0,0,0,96,126a178,178,0,0,0,26-1.88V152c-4.34.69-8.91,1.22-13.69,1.56ZM170,105.89V124c0,9.54-13.75,19.8-36,25.51V121.85a115,115,0,0,0,21-6.92A66.2,66.2,0,0,0,170,105.89ZM96,54c43.61,0,74,15.81,74,30s-30.39,30-74,30S22,98.19,22,84,52.39,54,96,54ZM22,124V105.89a66.2,66.2,0,0,0,15,9,115,115,0,0,0,21,6.92v27.66C35.75,143.8,22,133.54,22,124Zm64,48v-6.28c3.3.18,6.63.28,10,.28q5.91,0,11.66-.37A123.17,123.17,0,0,0,122,169.84v27.67C99.75,191.8,86,181.54,86,172Zm48,28V172.1a177.84,177.84,0,0,0,26,1.9,178,178,0,0,0,26-1.88V200a170,170,0,0,1-52,0Zm64-2.49V169.85a115,115,0,0,0,21-6.92,66.2,66.2,0,0,0,15-9V172C234,181.54,220.25,191.8,198,197.51Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.highestPrice" binary />
                    <label for="highestPrice" class="w-75"> Precio más alto </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M224.56,103.81C213.43,97.75,198.47,93.39,182,91.34V84c0-12.12-9.58-23.1-27-30.93C139.16,45.93,118.2,42,96,42S52.84,45.93,37,53.07C19.58,60.9,10,71.88,10,84v40c0,12.12,9.58,23.1,27,30.93,10.49,4.72,23.21,8,37,9.73V172c0,12.12,9.58,23.1,27,30.93C116.84,210.07,137.8,214,160,214s43.16-3.93,59-11.07c17.39-7.83,27-18.81,27-30.93V132C246,121.35,238.39,111.34,224.56,103.81Zm-5.74,10.54C228.61,119.68,234,126,234,132c0,14.19-30.39,30-74,30a166.9,166.9,0,0,1-21.21-1.34A110.79,110.79,0,0,0,155,154.93c17.39-7.83,27-18.81,27-30.93V103.43C196.4,105.36,209.3,109.16,218.82,114.35ZM108.16,153.58c-3.92.27-8,.42-12.16.42-5.3,0-10.4-.24-15.28-.67a2.22,2.22,0,0,0-.37,0c-3.58-.33-7-.77-10.35-1.3V124.12A178,178,0,0,0,96,126a178,178,0,0,0,26-1.88V152c-4.34.69-8.91,1.22-13.69,1.56ZM170,105.89V124c0,9.54-13.75,19.8-36,25.51V121.85a115,115,0,0,0,21-6.92A66.2,66.2,0,0,0,170,105.89ZM96,54c43.61,0,74,15.81,74,30s-30.39,30-74,30S22,98.19,22,84,52.39,54,96,54ZM22,124V105.89a66.2,66.2,0,0,0,15,9,115,115,0,0,0,21,6.92v27.66C35.75,143.8,22,133.54,22,124Zm64,48v-6.28c3.3.18,6.63.28,10,.28q5.91,0,11.66-.37A123.17,123.17,0,0,0,122,169.84v27.67C99.75,191.8,86,181.54,86,172Zm48,28V172.1a177.84,177.84,0,0,0,26,1.9,178,178,0,0,0,26-1.88V200a170,170,0,0,1-52,0Zm64-2.49V169.85a115,115,0,0,0,21-6.92,66.2,66.2,0,0,0,15-9V172C234,181.54,220.25,191.8,198,197.51Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.highestRating" binary />
                    <label for="highestRating" class="w-75"> Valoracion más alto </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.lowestRating" binary />
                    <label for="lowestRating" class="w-75"> Valoracion más bajo </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#334155" viewBox="0 0 256 256">
                        <path
                            d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.availableSeats" binary />
                    <label for="highestRating" class="w-75"> Más asientos disponibles </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path
                            d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                        </path>
                    </svg>
                </div>
                <div class="flex align-items-center gap-2 justify-content-between inputFilter">
                    <Checkbox v-model="filters.lessSeats" binary />
                    <label for="lowestRating" class="w-75"> Menos asientos disponibles </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path
                            d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="row w-main">
            <div class="col-12">
                <h4>Resultados de búsqueda</h4>
                {{ departure_time }}, {{ start_point }} -> {{ end_point }}
            </div>
            <div v-for="(trip, index) in displayResults" :key="index" class="border rounded mb-5">
                <div class="col-12">
                    <div class="d-flex pb-4">
                        <Timeline :value="getTimelineEvents(trip)" layout="horizontal" align="top"
                            class="border-end w-75 pe-5">
                            <template #marker="slotProps">
                                <i class="pi pi-map-marker px-2" style="font-size: 1.5rem"></i>
                                <p class="m-0 px-2">{{ slotProps.item.time }}</p>
                            </template>
                            <template #content="slotProps">
                                <div class="timeline-event">
                                    <p class="m-0">{{ slotProps.item.location }}</p>
                                </div>
                            </template>
                        </Timeline>
                        <div class="d-flex flex-column justify-content-center align-items-center gap-3 w-25">
                            <span class="text-xl font-semibold">${{ trip.price }}</span>
                            <button class="btn-primary"
                                @click="handleReservation(trip.id, searchTrip2.available_seats)">
                                Reserva
                            </button>
                        </div>
                    </div>
                    <div class="d-flex border-top pt-3 px-5 ">
                        <div class="d-flex gap-3 align-items-center pe-5 border-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                                viewBox="0 0 256 256">
                                <path
                                    d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                                </path>
                            </svg>
                            <p class="m-0">{{ trip.available_seats }}</p>
                        </div>
                        <div class="border-start border-end ps-5 w-75">
                            <p>Tags</p>
                        </div>
                        <div class="d-flex align-items-center ps-5 gap-5">
                            <Rating v-model="rating" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//  Components
import TripFinder from "../../components/TripFinder.vue";

// Composables
import useTrips from "@/composables/trips";
const { getTrips, tripsList, searchTrip, searchTripList } = useTrips();
import useUsers from "@/composables/users";
const { getUser, user } = useUsers();

// Store
import { useTripStore } from "@/store/trip.js";
const tripStore = useTripStore  ();

// Routes
import { useRoute } from "vue-router";
const route = useRoute();

import { useRouter } from "vue-router";
const router = useRouter();

// PrimeVue
import Timeline from "primevue/timeline";
import Rating from 'primevue/rating';
import Checkbox from 'primevue/checkbox';

const rating = ref(null);

// Vue
import { onMounted, ref, watch, computed } from "vue";

function formatTime(dateTime) {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("es-ES", {
        hour: "numeric",
        minute: "numeric",
    }).format(date);
}

function getTimelineEvents(trip) {
    return [
        {
            location: trip.start_address,
            time: formatTime(trip.departure_time),
        },
        {
            location: trip.end_address,
            time: formatTime(trip.arrival_time),
        },
    ];
}

onMounted(async () => {
    const queryParams = route.query;
    if (queryParams.data) {
        try {
            const searchData = JSON.parse(queryParams.data);
            await handleSearch(searchData);            
        } catch (error) {
            console.error('Error parsing search data:', error);
        }
    }
});

const formatedtime = (date) => {
    return new Date(date).toISOString().slice(0, 10);
}

const searchTrip2 = ref({});
const searchResults = ref({});
const searchResultsFiltered = ref({});
const start_point = ref("");
const end_point = ref("");
const departure_time = ref("");
const start_origin = ref(null);
const end_destination = ref(null);

const handleReservation = (tripId, availableSeats) => {
    const tripInfo = {
        start_point: start_origin.value, 
        end_point: end_destination.value
    };

    // 2. Guarda en el store
    tripStore.setTripData(tripInfo);
    // console.log('Datos guardados:', tripStore.tripData);

    // 3. Navega a la página de confirmación
    router.push({
        name: 'ConfirmationTrips',
        params: {
            id: tripId,
            seats: availableSeats
        }
    });
};

const handleSearch = async (searchData) => {
    try {
        start_origin.value = searchData.origin;
        end_destination.value = searchData.destination;
        console.log("search data", searchData.origin);

        searchTrip2.value = {
            start_point: searchData.origin.name,
            locality_start: searchData.origin.address_components.find(comp => comp.types.includes('locality')).long_name,
            end_point: searchData.destination.name,
            locality_end: searchData.destination.address_components.find(comp => comp.types.includes('locality')).long_name,
            date: searchData.date,
            available_seats: searchData.passengers 
        };

        start_point.value = searchTrip2.value.start_point;
        end_point.value = searchTrip2.value.end_point;
        departure_time.value = formatedtime(searchTrip2.value.date);

        await searchTrip(searchTrip2.value);

        // console.log("SearchTrip", searchTripList.value);

        const user_id = ref(null)

        for (const key of searchTripList.value) {
            user_id.value = key.user_id;
        }

        await getUser(user_id.value);

        for (const key of user.value) {
            rating.value = key.rating
        }

        applyFilters();
    } catch (err) {
        console.error('Error in search:', err);
    }
};

const filters = ref({
    earlyDeparture: false,
    lateDeparture: false,
    lowestPrice: false,
    highestPrice: false,
    lowestRating: false,
    highestRating: false,
    availableSeats: false,
    lessSeats: false,
});

const applyFilters = () => {
    if (
        !filters.value.lowestPrice &&
        !filters.value.highestPrice &&
        !filters.value.lowestRating &&
        !filters.value.highestRating &&
        !filters.value.earlyDeparture &&
        !filters.value.lateDeparture &&
        !filters.value.availableSeats &&
        !filters.value.lessSeats
    ) {
        searchResultsFiltered.value = [...searchTripList.value];
        console.log('Sin filtros activos, mostrando todos los resultados:', searchResultsFiltered.value);
        return;
    }

    let orderedResults = [...searchTripList.value];

    if (filters.value.lowestPrice) {
        orderedResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.value.highestPrice) {
        orderedResults.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (filters.value.lowestRating) {
        orderedResults.sort((a, b) => parseFloat(a.rating || 0) - parseFloat(b.rating || 0));
    } else if (filters.value.highestRating) {
        orderedResults.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    }

    if (filters.value.earlyDeparture) {
        orderedResults.sort((a, b) => new Date(a.departure_time) - new Date(b.departure_time));
    } else if (filters.value.lateDeparture) {
        orderedResults.sort((a, b) => new Date(b.departure_time) - new Date(a.departure_time));
    }

    if (filters.value.availableSeats) {
        orderedResults.sort((a, b) => parseFloat(b.available_seats || 0) - parseFloat(a.available_seats || 0));
    } else if (filters.value.lessSeats) {
        orderedResults.sort((a, b) => parseFloat(a.available_seats || 0) - parseFloat(b.available_seats || 0));
    }

    searchResultsFiltered.value = orderedResults;
    console.log('Resultados ordenados:', searchResultsFiltered.value);
};

watch(filters, () => {
    applyFilters();
}, { deep: true });

const displayResults = computed(() => {
    return searchResultsFiltered.value;
});

</script>


<style scoped>
.w-aside {
    padding: 0;
    width: 27%;
}

.w-main {
    width: 73%;
    background-color: white;
    box-shadow: #00000026 0px 10px 10px 0px;
    border-radius: 10px;
    padding: 20px;
}

.container-trips {
    border: solid 1px #d0d1d3;
    border-radius: 10px;
}

label {
    font-weight: 500;
}

.inputFilter {
    border: solid 0px #e0e0e0;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
}

.inputFilter:hover {
    background-color: #ececec;
}

.rounded-img {
    border-radius: 10px 0px 0px 10px;
}

.container-trip {
    gap: 80px;
}

.container-info {
    display: flex;
    justify-content: space-between;
}

@media (max-width: 458px) {
    .w-aside {
        width: auto;
    }

    .w-main {
        width: auto;
    }

    .container-responsive {
        flex-direction: column;
    }

    .rounded-img {
        border-radius: 10px 10px 0px 0px;
    }

    img {
        width: 100%;
        height: auto;
    }

    .container-info {
        flex-direction: column;
    }

    .container-trip {
        flex-direction: column;
        gap: 30px;
    }

    .price {
        justify-content: space-between;
        margin-bottom: 30px;
    }
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
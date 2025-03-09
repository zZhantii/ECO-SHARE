<template>
    <DataView :value="trips" paginator :rows="5">
        <template #list="slotProps">
            <div class="flex flex-col flex-column gap-4">
                <div class="container-trips" v-for="(trip, index) in slotProps.items" :key="index">
                    <div class="d-flex container-info"
                        :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                        <div>
                            <img class="block xl:block mx-auto rounded-img" src="../../../public/images/image.png"
                                alt="Trip Image" height="188px" />
                        </div>
                        <div class="d-flex w-100 justify-content-center">
                            <div class="d-flex p-3 container-trip">
                                <div class="d-flex flex-column justify-content-around gap-4">
                                    <div class="d-flex gap-2">
                                        <h4>{{ trip.start_point }}:</h4>
                                        <p>{{ trip.departure_time }}</p>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <h4>{{ trip.end_point }}:</h4>
                                        <p>{{ trip.departure_time }}</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-column justify-content-around">
                                    <div class="d-flex align-items-center gap-5 price">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="p-2 border-1 rounded me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                    fill="#000000" viewBox="0 0 256 256">
                                                    <path
                                                        d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <p class="m-0 w-75"> {{ trip.available_seats }}</p>
                                        </div>
                                        <span class="text-xl font-semibold">${{ trip.price }}</span>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <Button icon="pi pi-shopping-cart" label="Reservar"
                                            class="flex-auto md:flex-initial whitespace-nowrap btn-secondary"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>

<script>
export default {
    props: {
        trips: {
            type: Array,
            required: True
        }
    }
}
</script>

<style scoped>
.container-trips {
    border: solid 1px #d0d1d3;
    border-radius: 10px;
}
</style>
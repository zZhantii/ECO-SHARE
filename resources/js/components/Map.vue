<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, isProxy } from "vue";

const props = defineProps({
    origin: Object,
    destination: Object,
});

const emit = defineEmits(["updateMapsInfo"]);
onMounted(() => {
    if (
        props.origin?.geometry?.location ||
        props.destination?.geometry?.location
    ) {
        mapData.value.mapCenter.lat = props.origin.geometry.location.lat();
        mapData.value.mapCenter.lng = props.origin.geometry.location.lng();
        mapData.value.destination.lat =
            props.destination.geometry.location.lat();
        mapData.value.destination.lng =
            props.destination.geometry.location.lng();
        initMap();
        setMarker(mapData.value.mapCenter, "D");
        setMarker(mapData.value.destination, "O");
    } else {
        initMap();
        setMarker(mapData.value.mapCenter, "O");
    }
});

watch(
    () => [props.origin, props.destination],
    ([newOrigin, newDestination]) => {
        if (
            newOrigin?.geometry?.location.lat &&
            newDestination?.geometry?.location.lat
        ) {
            mapData.value.mapCenter.lat = newOrigin.geometry.location.lat();
            mapData.value.mapCenter.lng = newOrigin.geometry.location.lng();
            mapData.value.destination.lat =
                newDestination?.geometry.location.lat();
            mapData.value.destination.lng =
                newDestination?.geometry.location.lng();
            initMap();
            setMarker(mapData.value.mapCenter, "O");
            setMarker(mapData.value.destination, "D");
        }
    }
);

const mapData = ref({
    map: null,
    mapCenter: {
        lat: 41.41087625773037,
        lng: 2.0270428374359217,
    },
    destination: { lat: 0, lng: 0 },
});
const initMap = () => {
    mapData.value.map = new google.maps.Map(document.getElementById("map"), {
        center: mapData.value.mapCenter,
        maxZoom: 20,
        minZoom: 5,
        zoom: 12,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true,
        disableDefaultUI: true,
    });

    fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify({
            origin: {
                location: {
                    latLng: {
                        latitude: mapData.value.mapCenter.lat,
                        longitude: mapData.value.mapCenter.lng,
                    },
                },
            },
            destination: {
                location: {
                    latLng: {
                        latitude: mapData.value.destination.lat,
                        longitude: mapData.value.destination.lng,
                    },
                },
            },
            travelMode: "DRIVE",
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Direccion enviada desde la API: ", data);
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];

                const decodedPath = google.maps.geometry.encoding.decodePath(
                    route.polyline.encodedPolyline
                );

                const polyline = new google.maps.Polyline({
                    path: decodedPath,
                    geodesic: true,
                    strokeColor: "#02aef8",
                    strokeOpacity: 1.0,
                    strokeWeight: 4,
                });

                polyline.setMap(mapData.value.map);

                const bounds = new google.maps.LatLngBounds();
                for (const element of decodedPath) {
                    bounds.extend(element);
                }

                mapData.value.map.fitBounds(bounds);
                const mapsInfo = {
                    origin: {
                        address: props.origin.name,
                        location: {
                            latitude: props.origin.geometry.location.lat(),
                            longitude: props.origin.geometry.location.lng(),
                        },
                    },
                    destination: {
                        address: props.destination.name,
                        location: {
                            latitude: props.destination.geometry.location.lat(),
                            longitude:
                                props.destination.geometry.location.lng(),
                        },
                    },
                    distance: route.distanceMeters,
                    duration: route.duration,
                };

                emit("updateMapsInfo", mapsInfo);
            }
        })
        .catch((error) => console.error("Error al obtener la ruta: ", error));
};

function setMarker(Points, Label) {
    const markers = new google.maps.Marker({
        position: Points,
        map: mapData.value.map,
        label: {
            text: Label,
            color: "white",
        },
    });
}
</script>

<style scoped>
#map {
    width: 100% !important;
    min-height: 300px !important;
    max-height: 700px !important;
    border-radius: 0px !important;
}
</style>

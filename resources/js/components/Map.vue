<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script setup>
import { min } from "lodash";
import { ref, onMounted } from "vue";

onMounted(() => {
    initMap();
    setMarker(mapData.value.mapCenter, "A");
    setMarker(mapData.value.destination, "B");
});

const mapData = ref({
    map: null,
    mapCenter: {
        lat: 41.41087625773037,
        lng: 2.0270428374359217,
    },
    destination: { lat: 41.380833333333, lng: 2.1227777777778 },
});
const initMap = () => {
    mapData.value.map = new google.maps.Map(document.getElementById("map"), {
        center: mapData.value.mapCenter,
        maxZoom: 20,
        minZoom: 10,
        zoom: 12,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true,
        disableDefaultUI: true,
    });

    const request = {
        origin: {
            address: `${mapData.value.mapCenter.lat},${mapData.value.mapCenter.lng}`,
        },
        destination: {
            address: `${mapData.value.destination.lat},${mapData.value.destination.lng}`,
        },
        key: "API_KEY", // Asegúrate de usar tu clave de API aquí
    };

    fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "API_KEY",
            "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline", // Coloca tu clave API aquí
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
            console.log(data);
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
                decodedPath.forEach((point) => {
                    bounds.extend(point);
                });
                mapData.value.map.fitBounds(bounds);

                new google.maps.Marker({
                    position: mapData.value.destination,
                    map: mapData.value.map,
                    label: "B",
                });
            }
        })
        .catch((error) => console.error("Error al obtener la ruta:", error));
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
}
</style>

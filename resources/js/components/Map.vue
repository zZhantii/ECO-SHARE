<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";

// Modal que recoge el objeto con el destino y la procedencia
const props = defineProps({
    origin: Object,
    destination: Object,
});

// Este emit es para cuando queremos visualizar de forma dinámica en la página de publicación de viajes

const emit = defineEmits(["updateMapsInfo"]);
onMounted(() => {
    // Al montar comprobamos si el objeto procede del automcomplete o o de la base de datos o si no hay datos y se debe
    // mostrar el marcador por defecto. En todos los casos se acciona el mapa con marcadores.

    // La primera comprobación es para los objetos que proceden del automcomplete y tienen los métodos lat y lng para
    // conseguir coordenadas
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
        // Esta comprobación es para el caso que la carga del mapa se haga con las latitudes y longitudes del mapa
    } else if (
        props.origin?.location?.latitude &&
        props.origin?.location?.longitude
    ) {
        mapData.value.mapCenter.lat = props.origin.location.latitude;
        mapData.value.mapCenter.lng = props.origin.location.longitude;
        mapData.value.destination.lat = props.destination.location.latitude;
        mapData.value.destination.lng = props.destination.location.longitude;
        initMap();
        setMarker(mapData.value.mapCenter, "O");
        setMarker(mapData.value.destination, "D");
        // Este es el incio por defecto del mapa con un solo marcador en la ubicación preestabelcida
    } else {
        initMap();
        setMarker(mapData.value.mapCenter, "O");
    }
});

watch(
    // Este watch comprueba los cambios de las variables que dan valor a los props en el apartado de publicación de viajes
    // para conseguir que se registren dinámicamente los cambios en el mapa
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
// Marcador por defecto del BERNAT EL FERRER en el mapa
const mapData = ref({
    map: null,
    mapCenter: {
        lat: 41.41087625773037,
        lng: 2.0270428374359217,
    },
    destination: { lat: 0, lng: 0 },
});

// Método que inicia el mapa y realiza la petición a la API para obtener datos de la ruyta
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

    // Este métodso pretende obtener datos para trazar la polilínea en el mapa y usar la api de DIRECTIONS de google
    // Retorna además distancias y tiempos del trayecto
    fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
        // El cuerpo de la petición pide para el método de conducción con coche a partir de la longitud y la latitud
        // de inicio y destino
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
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];

                const decodedPath = google.maps.geometry.encoding.decodePath(
                    route.polyline.encodedPolyline
                );
                // Con los puntos obtenidos, se procede a trazar la polilínea que marca la ruta en el mapa
                const polyline = new google.maps.Polyline({
                    path: decodedPath,
                    geodesic: true,
                    strokeColor: "#02aef8",
                    strokeOpacity: 1.0,
                    strokeWeight: 4,
                });

                // Dibujamos la polilínea en el mapa
                polyline.setMap(mapData.value.map);

                // Se obtienen los límites del mapa para que se ajusten a la ruta
                const bounds = new google.maps.LatLngBounds();
                for (const element of decodedPath) {
                    bounds.extend(element);
                }

                // Ajuste del zoom a los límites del mapa
                mapData.value.map.fitBounds(bounds);

                // Creación de un objeto con información útil sobre el mapa
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

// Función que establece los marcadores en el mapa
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
    border-radius: 12px !important;
}
</style>

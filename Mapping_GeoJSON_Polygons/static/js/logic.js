

const atributesTileLayer = 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>';
const tileLayerUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
var streets = L.tileLayer(tileLayerUrl, {
    attribution: atributesTileLayer,
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/streets-v10'

});

// dark layer
let satelliteStreets = L.tileLayer(tileLayerUrl, {
    attribution: atributesTileLayer,
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/satellite-streets-v11'
});

const map = L.map('mapid',{
    center: [ 43.68108112399995,-79.3],
    zoom: 10,
    layers: streets });




// Accessing the airport GeoJSON URL
const torontoHoods = "https://raw.githubusercontent.com/lindaperez/mapping-earthquakes/main/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";



// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        color:'blue',
        weight:1,
        fillColor:'yellow'
    })
    .addTo(map);
});

var baseMaps = {
    'Streets': streets,
    'Satellite Streets': satelliteStreets
  };

  L.control.layers(baseMaps).addTo(map);
  
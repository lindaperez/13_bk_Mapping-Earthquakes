const map = L.map('mapid').setView([30, 30], 2);


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
let dark = L.tileLayer(tileLayerUrl, {
    attribution: atributesTileLayer,
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/dark-v10'
});
dark.addTo(map);
// Accessing the airport GeoJSON URL
const airportData = "https://raw.githubusercontent.com/lindaperez/mapping-earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";


var sfoAirport = [];
// Grabbing our GeoJSON data.
d3.json(airportData).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        color : 'yellow',
        weight : 2,
        onEachFeature: function (feature,layer) {
            console.log(feature)
            layer
            .bindPopup("<h3> Airline: "+
            feature.properties.airline+
            "</h3><hr> Destination : "+
            feature.properties.dst);
     
            
        }
    })
    .addTo(map);
});
const overlaySfo= L.layerGroup(sfoAirport);

var baseMaps = {
    'Day Navigation': streets,
    'Night Navigation': dark
  };

  var overlayMaps = {
    Airport: overlaySfo
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
  
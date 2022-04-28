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
streets.addTo(map);
// dark layer
let dark = L.tileLayer(tileLayerUrl, {
    attribution: atributesTileLayer,
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/dark-v10'
});
// Accessing the airport GeoJSON URL
const airportData = "torontoRoutes.json";

var sfoAirport = [];
// Grabbing our GeoJSON data.
d3.json(airportData).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        pointToLayer: function (feature, latlng) {
            console.log('Feature',feature)
            let geoMarker =  L.marker(latlng)
            .bindPopup("<h3> Airport code: "+
            feature.properties.faa+
            "</h3><hr><b>Airport Name: "+
            feature.properties.name+
            "</b>");
            sfoAirport.push(geoMarker);
            return geoMarker
        }
    })
    .addTo(map);
});
const overlaySfo= L.layerGroup(sfoAirport);

var baseMaps = {
    Light: streets,
    Dark: dark
  };

  var overlayMaps = {
    Airport: overlaySfo
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
  
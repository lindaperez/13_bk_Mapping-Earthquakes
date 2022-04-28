// Center of the map
let map = L.map('mapid').setView([37.5, -122.5], 10);

//streets tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/streets-v10'

});
// dark layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/dark-v10'

});
//default layer
streets.addTo(map);

let sanFanAirport =
{   "type":"FeatureCollection",
    "features": [{
        "type":"Feature",
        "properties": {
            "id": "3469",
            "name": "San Francisco International Airport",
            "city": "San Francisco",
            "country": "United States",
            "faa": "SFO",
            "icao": "KSFO",
            "alt": "13",
            "tz-offset": "-8",
            "dst": "A",
            "tz": "America/Los_Angeles"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-122.375, 37.61899948120117]
        }
    }]
};
var sfoAirport = [];
L.geoJSON(sanFanAirport, {
    pointToLayer: function (feature, latlng) {
        console.log('Feature',feature)
        let geoMarker =  L.marker(latlng)
        .bindPopup("<h3>"+feature.properties.name+"</h3>\
        <hr> <b>"+feature.properties.city+", "
        +feature.properties.country+"</b>");
        sfoAirport.push(geoMarker);
        return geoMarker
    }
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
  
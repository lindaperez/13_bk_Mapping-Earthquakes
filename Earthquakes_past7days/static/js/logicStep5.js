

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

const map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: streets
});




// Accessing the airport GeoJSON URL
const torontoHoods = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


let myStyle = {
    color: "#ffffa1",
    weight: 2
};


function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
let earthquakes = new L.layerGroup();
// Grabbing GeoJSON data.
d3.json(torontoHoods).then(function (data) {
    L.geoJSON(data, {
        style: styleInfo,
        // We turn each feature into a circleMarker on the map.

        pointToLayer: function (feature, latlng) {
            //console.log(feature);
            let marker = L.circleMarker(latlng);
            return marker;
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
    }).addTo(earthquakes);
    earthquakes.addTo(map)
});


//var cities = L.layerGroup([littleton,denver,aurora,golden]);


let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

let overlays = {
  Earthquakes: earthquakes
};
// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

let legend = L.control({
  position:'bottomright'
});

legend.onAdd = function () {
  let div = L.DomUtil.create('div', 'info legend');
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00","#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"
  ];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(map);


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


let satelliteStreets = L.tileLayer(tileLayerUrl, {
  attribution: atributesTileLayer,
  maxZoom: 18,
  accessToken: API_KEY,
  tileSize: 512,
  zoomOffset: -1,
  id: 'mapbox/satellite-streets-v11'
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

const map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: streets
});


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

d3.json(torontoHoods).then(function (data) {
  L.geoJSON(data, {
    style: styleInfo,

    pointToLayer: function (feature, latlng) {
      let marker = L.circleMarker(latlng);
      return marker;
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakes);
  earthquakes.addTo(map);
});

let major_earthquakes_layer = new L.layerGroup();


const m_4_5_earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


d3.json(m_4_5_earthquakes).then(function (data) {

  //magnitude less than 5, a magnitude greater than 5, and a magnitude greater than 6

  function getColorM45(magnitude) {
    if (magnitude > 6) {
      return "#ea2c2c";
    } else if (magnitude > 5 && magnitude <= 6) {
      return "#ea822c";
    }
    else if (magnitude <= 5) {
      return "#ee9c00";
    }
  }
  function styleInfoM45(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColorM45(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  L.geoJSON(data, {
    style: styleInfo,

    pointToLayer: function (feature, latlng) {
      let marker = L.circleMarker(latlng);
      return marker;
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

  }).addTo(major_earthquakes_layer);
  major_earthquakes_layer.addTo(map);


});



let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark" :dark
};

let legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function () {
  let div = L.DomUtil.create('div', 'info legend');
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"
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


const bondaries_2002 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


let tectonicPlates = new L.layerGroup();

d3.json(bondaries_2002).then(function (data) {
  console.log(data);

  L.geoJSON(data, {
    color: 'orange',
    weight: 1.5
  }).addTo(tectonicPlates);
  tectonicPlates.addTo(map);
});

let overlays = {
  'Tectonic Plates': tectonicPlates,
  'Earthquakes': earthquakes,
  'Major Earthquakes' : major_earthquakes_layer
};

L.control.layers(baseMaps, overlays).addTo(map);


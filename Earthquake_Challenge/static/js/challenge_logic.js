
/*Layer constants*/
const atributesTileLayer = 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>';
const tileLayerUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

/* Street Layer */
var streets = L.tileLayer(tileLayerUrl, {
  attribution: atributesTileLayer,
  maxZoom: 18,
  accessToken: API_KEY,
  tileSize: 512,
  zoomOffset: -1,
  id: 'mapbox/streets-v10'

});
/* Satellitestreet Layer */
let satelliteStreets = L.tileLayer(tileLayerUrl, {
  attribution: atributesTileLayer,
  maxZoom: 18,
  accessToken: API_KEY,
  tileSize: 512,
  zoomOffset: -1,
  id: 'mapbox/satellite-streets-v11'
});
/* Dark Layer */
let dark = L.tileLayer(tileLayerUrl, {
  attribution: atributesTileLayer,
  maxZoom: 18,
  accessToken: API_KEY,
  tileSize: 512,
  zoomOffset: -1,
  id: 'mapbox/dark-v10'
});

let map = L.map('mapid', { center: [40.7, -94.5], zoom: 3, layers: [streets] });

let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};


  /* Generic Function for all Layers to get the radius given a magnitude */
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }


let allEarthquakes = new L.LayerGroup();
let earthquakePath = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(earthquakePath).then(function (data) {

  /* Function to get a color given a magnitude */
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
  /* Function to generate the style of every feature */
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


  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);
});


/* Setting major earthquakes layer */
let majorEarthquakes = new L.layerGroup();
const majorEarthquakesPath = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
d3.json(majorEarthquakesPath).then(function (data) {

  function getColorM45(magnitude) {
    if (magnitude > 6) {
      return "#ea2c2c";
    }
    if (magnitude > 5) {
      return "#ea822c";
    }
    if (magnitude <= 5) {
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
    style: styleInfoM45,

    pointToLayer: function (feature, latlng) {
      let marker = L.circleMarker(latlng);
      return marker;
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

  }).addTo(majorEarthquakes);
  majorEarthquakes.addTo(map);

});

/* Setting boundary layer */
const bondaries_2002 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
let tectonicPlates = new L.layerGroup();
d3.json(bondaries_2002).then(function (data) {
  L.geoJSON(data, {
    color: 'orange',
    weight: 1.5
  }).addTo(tectonicPlates);
  tectonicPlates.addTo(map);
});

/* Setting overlay */
let overlays = {
  'Tectonic Plates': tectonicPlates,
  'Earthquakes': allEarthquakes,
  'Major Earthquakes': majorEarthquakes
};

/* Legend bottomright by color gradient */
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

/* Displaying Layers */
L.control.layers(baseMaps, overlays).addTo(map);
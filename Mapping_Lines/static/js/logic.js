console.log("Working...")
// Create the map object with a center and zoom level.

let map = L.map('mapid').setView([30.1926,-97.6650], 5);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/satellite-streets-v11'

});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Coordinates for each point to be used in the polyline.
let line = [
    [37.6212,-122.3829], //SFO
    [30.1926,-97.6650], //AUS
    [43.6809,-79.6136], //YYZ
    [40.6416,-73.7797],  //JFK
    [37.3622,-121.9294] //SJC
  ];
// Create a polyline using the line coordinates and make the line red.

L.polyline(line, {
    color: "blue",
    weight: 4,
    opacity: 0.5
 }).addTo(map);
console.log("Working...")
// Create the map object with a center and zoom level.

var map = L.map('mapid').setView([40.7,-94.5],4);
// let map = L.map('mapid',
//     {
//         center: [40.7, -94.5],
//         zoom: 4
//     });

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY, 
    tileSize:512,
    zoomOffset: -1
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);



//  Add a marker to the map for Los Angeles, California.
let marker = L.marker([34.0522, -118.2437]).addTo(map);

//map = L.map('mapid').setView([34.0522,-118.2437],14);
 L.circle([34.0522, -118.2437], {
     radius: 500, 
     color: 'black',
     fillColor: '#ffffa1',
  }).addTo(map);


// Alternative
 L.circleMarker([34.0522, -118.2437],{
    radius: 300,
    color: "black",
    fillColor: "#ffffa1"
 }).addTo(map);
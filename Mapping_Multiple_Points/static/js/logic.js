console.log("Working...")
// Create the map object with a center and zoom level.

var map = L.map('mapid').setView([40.7, -94.5], 4);

// let map = L.map('mapid',
//     {
//         center: [40.7, -94.5],
//         zoom: 4
//     });


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/dark-v10'

});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
// Get data from cities.js
let cityData = cities;

cityData.forEach(function (city) {
    console.log('City:', city);

   
    L.circleMarker(city.location,{
        radius: city.population/100000,
        color: "orange",
        fillColor: "#ffffa1",
        lineweight: 4
     })
     .bindPopup('<b>'+city.city+', '+city.state+'</b>\
     <hr>\
     <b>Population:</b> '
     +city.population.toLocaleString()+'<br>')
     .addTo(map);
    
});

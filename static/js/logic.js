var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  // Store API query variables
  var chartURL = "/data";

  // get walk score for given restaurant
  function getWalkScore(lat, lon, address) {
    var address=encodeURI(address);
    console.log(address)
    var baseUrl = `http://api.walkscore.com/score?format=json&address${address}&lat=${lat}&lon=${lon}&wsapikey=432a8921bb7e0a9c81ba0a01a48b5807&limit=10`;
  //   $str = @file_get_contents($url); 
    return baseUrl; 
  } 
  // Grab the data with d3
  d3.json(chartURL, function(response) {
    //console.log(response);
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
    
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable   
    var location = response[i].Lat

    // Check for location property
    if (location) {
      lat = response[i].Lat
      lon = response[i].Lng
      address = str(response[i].Street + " "+ response[i].City +  " "+ response[i].State +  " "+ response[i].Zip)
      address = stripslashes($address);
      $.getJSON = getWalkScore(lat,lon,address);
      console.log(json);

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lon, lat])
      .bindPopup("Name: "+response[i].DBA  +"<br>Status: "+ response[i].success + " <br>Inspection: "+response[i].Inspection +"<br>Year: "+ response[i].Year))
    
    }
    // console.log(response[i].Lat, response[i].Lng)
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

// // Leaflet -- show latitude logitude for any point clicked on map
// marker.on('click', function(ev){
//   var latlng = map.mouseEventToLatLng(ev.originalEvent);
//   console.log(latlng.lat + ', ' + latlng.lng);
// });



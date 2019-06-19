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
      if (response[i].Year ==2018){
        // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([response[i].Lng, response[i].Lat])
      .bindPopup(response[i].DBA  + response[i].success + response[i].Inspection + response[i].Year))
    

      }

      
    }
    console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
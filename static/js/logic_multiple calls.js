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
//////////////////// 2016
  // Store API query variables
  var chartURL = "/InspectionDate/2016";
 
  // Grab the data with d3
  d3.json(chartURL, function(response) {
    //console.log(response);
  
  // Create marker cluster group for 2016
  var markers2016 = L.markerClusterGroup();
    
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable   
    var yr2016 = response[i].Lat

    // Check for location property
    // if (yr2016) {

    //   // Add a new marker to the cluster group and bind a pop-up
    //   markers2016.addLayer(L.marker([response[i].Lng, response[i].Lat])
    //   .bindPopup(response[i].DBA  + response[i].success + response[i].Inspection + response[i].Year))
    
    // }
    // console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
 myMap.addLayer(markers2016);
});

  ///////2017
  // Store API query variables
  var chartURL = "/InspectionDate/2017";
 
  // Grab the data with d3
  d3.json(chartURL, function(response) {
    //console.log(response);
  
  // Create marker cluster group for 2016
  var markers2017 = L.markerClusterGroup();
    
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable   
    var yr2017 = response[i].Lat

    // Check for location property
    if (yr2017) {

      // Add a new marker to the cluster group and bind a pop-up
      markers2017.addLayer(L.marker([response[i].Lng, response[i].Lat])
      .bindPopup(response[i].DBA  + response[i].success + response[i].Inspection + response[i].Year))
    
    }
    console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
 myMap.addLayer(markers2017);
});
///////2018

  ///////2017
  // Store API query variables
  var chartURL = "/InspectionDate/2018";
 
  // Grab the data with d3
  d3.json(chartURL, function(response) {
    //console.log(response);
  
  // Create marker cluster group for 2018
  var markers2018 = L.markerClusterGroup();
    
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable   
    var yr2018 = response[i].Lat

    // Check for location property
    if (yr2018) {

      // Add a new marker to the cluster group and bind a pop-up
      markers2018.addLayer(L.marker([response[i].Lng, response[i].Lat])
      .bindPopup(response[i].DBA  + response[i].success + response[i].Inspection + response[i].Year))
    
    }
    console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers2018);
});

  /////////2019

  // Store API query variables
  var chartURL = "/InspectionDate/2019";
 
  // Grab the data with d3
  d3.json(chartURL, function(response) {
    //console.log(response);
  
  // Create marker cluster group for 2016
  var markers2019 = L.markerClusterGroup();
    
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable   
    var yr2019 = response[i].Lat

    // Check for location property
    if (yr2019) {

      // Add a new marker to the cluster group and bind a pop-up
      markers2019.addLayer(L.marker([response[i].Lng, response[i].Lat])
      .bindPopup(response[i].DBA  + response[i].success + response[i].Inspection + response[i].Year))
    
    }
    console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers2019);

  function togglePoints() {
    if(!toggle) {
      map.removeLayer(markers2019);
    } else {
      map.addLayer(markers2019);
    }
    toggle = !toggle;
  }
  
});

window.scrollTo(0,0);

// get walk score for given restaurant
 function getWalkScore(lat, lon, address) {
  var address=encodeURI(address);
  console.log(address)
  console.log(lat)
  var baseUrl = `http://api.walkscore.com/score?format=json&address${address}&lat=${lat}&lon=${lon}&wsapikey=432a8921bb7e0a9c81ba0a01a48b5807&limit=10`;
//   $str = @file_get_contents($url); 
return baseUrl;
} 

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
    var lat = response[i].Lat
    var year = response[i].Year
    
    
    // //for walk score merging with the data
    var lon = response[i].Lng
    // var address = response[i].Street + response[i].City +  response[i].State + response[i].Zip
    // $.getJSON(getWalkScore(lat,lon,address),function(data){ //add GeoJSON layer to the map once the file is loaded 
    // L.geoJson(data, { style: function (feature) { return {}; }, 
    //   onEachFeature: function (feature, layer) 
    //   { layer.bindPopup(feature.properties.Sheet_Numb); } })
    //   .addTo(map); })
    // var json_url = getWalkScore(lat,lon,address);
    // // var hack_url = "/get-walkscore-data?url="+json_url;
    // d3.json(json_url,function(data){
    //   console.log(data);
    // });

    //popup variables
    var popup = "Name: "+response[i].DBA  +"<br>Status: "+ response[i].success + " <br>Inspection: "+response[i].Inspection +"<br>Year: "+ year
    
    // Check for location property
    if (lat) {
      if (year ==2018){
        // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lon, lat]).bindPopup(popup))
        // "Name: "+response[i].DBA  +"<br>Status: "+ response[i].success + " <br>Inspection: "+response[i].Inspection + response[i].street +"<br>Year: "+ response[i].Year))
    

      }
    else {
          console.log("fail")
        }
      
    }
    // console.log(response[i].Lat, response[1].Lng)
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
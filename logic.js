
// Creating the map object
let myMap = L.map("map", {
    center: [0, 0], 
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



//link to get GeoJSON
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting GeoJSON data
d3.json(link).then(function(data) {
   
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            
            return L.circleMarker(latlng, {
                radius: Math.sqrt(feature.properties.mag) * 5,  
                fillColor: "red",
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${feature.properties.mag}`);
        }
    }).addTo(myMap);
});


//Create the legend - No
//var legend = L.control({ position: "bottomright" });

//legend.onAdd = function (myMap) {
  //  var div = L.DomUtil.create('div', 'info legend');
    //var grades = [-5, 58.75, 122.5, 186.25, 250];
    //var colors = ["#FFFF00", "#1CF400", "#0021FF", "#8806CE", "#CC0000"];

    //for (var i = 0; i < grades.length; i++) {
      //  div.innerHTML +=
        //    '<div class="legend-item" style="background-color:' + colors[i] + '">' +
          //  '</div>' +
            //'<label>' + grades[i] + '</label><br>';
    //}
    //return div;
//};

//legend.addTo(myMap);



let legend = L.control({ position: "bottomright" });
legend.onAdd = function (myMap) {
  // initialize a <div> to add to HTML 
  let div = L.DomUtil.create('div', 'info legend');
  // Create 2 lists to loop through and append with a corresponding color
  let depths = ["0  -—————————————————— 15",
                "15 —————————————————— 30",
                "30 —————————————————— 45",
                "45 —————————————————— 60",
                "60 —————————————————— 75",
                "75 —————————————————— 90",
                "90 —————————————————— 105",
                "105 —————————————————- 120+"];
  let colors = ['#DAFFB0','#D4E8A7',"#CCC799","#C0917D","#B27378","#9D5066","#953450","#900C3F"];
// Initialize a header on the legend
div.innerHTML = "<h2>Earthquake Depths Chart (km)</h2><hr>"
// Initialize a for loop to add elements to "legend-item"
for (let i = 0; i < depths.length; i++) {
  // Individual line of code that grabs the current color and depth range and adds to legend
  div.innerHTML += 
    '<div class="legend-item" style="background-color:' + colors[i] + '"></div>' +'<label>' + depths[i] + '</label><br>';
  }
  // Return the div item
    return div;
};
// Add the legend to our map
legend.addTo(myMap);


//}
//}

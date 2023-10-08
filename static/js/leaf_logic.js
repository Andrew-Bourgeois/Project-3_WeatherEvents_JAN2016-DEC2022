/*
Leaflet Map code for Project 3

Use the global variables created via the D3 JSON object to query for data.

*/

// function to create the data features based on the data chosen
function createMapFeatures(weatherData) {
    // first create a new JSON array grouped by airport code
    let groupByAPCode = Object.groupBy(weatherData, airport => {
        return airport.airportcode;
    });
    // add a new column for duration of storm with endtime - starttime


    // show resulting array in the console
    console.log(groupByAPCode);

    // loop through airport codes and create the current map marker data
    for (let a = 0; a < groupByAPCode.length; a++) {
        for (let s = 0; s < a.length; s++) {
            d = { "duration": s.endtime - s.starttime };
            s.update(d);
        }
        let numStorm = groupByAPCode[a].length;
        // choose marker color based on number of storms
        let color = chooseColor(numStorm);
        let apId = 
        
        let location = [storm.lat, storm.lon];
        
    }
    // let groupByAPCode = weatherJson.reduce(function (result, current) {
    //     result[current.airportcode] = result[current.airportcode] || [];
    //     result[current.airportcode].push(current);
    //     return result;
    // }, {}));

}


// function to choose color for the markers
function chooseColor(storms) {
    let color = "";
    
}



// create the base layers
// create street map base layer

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Map data 2023 ©Google</a> contributors'
});

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// create topo map base layer
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// create Google Satellite base layer
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        attribution: '&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Map data 2023 ©Google</a> contributors'
});

// Create a baseMaps object.
let baseMaps = {
    "Google Streets": googleStreets,
    "Staellite": googleSat,
    "Street Map": street,
    "Topographic Map": topo
};


// create the map
let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [street],
    float: screenLeft,
    width: 700px,
    height: 500px
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);

// create a legend
let color_legend = L.control({
    position: "bottomright"
});

// use .onAdd() method to add color_legend to the map
color_legend.onAdd = function () {
    let div = L.DomUtil.create("div", "depth_legend");
    let marker_colors = [];
    let marker_labels = [];

    // Update the legend to include the desired color squares and label
    div.innerHTML =
        `<h3>Storm Density</h3>
        <div class='marker_info'>
            <input type='text' value=${marker_labels[0]} />
            <div class='marker_color' style='background-color: ${marker_colors[0]};'></div>
        </div>
        `
    return div;
};

// add the color_legend to the map
color_legend.addTo(myMap);
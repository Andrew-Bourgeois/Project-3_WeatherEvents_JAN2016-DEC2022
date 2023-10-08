

const url = "http://127.0.0.1:5000/api/v1.0/weatherdata"
let latS = 25;
let latN = 50;
let lonW = -125;
let lonE = -65;
let startDate = '2016-01';
let endDate = '2023-01';

let weatherJson;

function filterDate(storm){
    const date = new Date(storm.starttime);           
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return date > startDate && date < endDate;
};

d3.select('button').on('click',function(){
    d3.select("#latS").on("input", function() {
        latS = this.value;
    })
    d3.select("#latN").on("input", function() {
        latN = this.value;
    })
    d3.select("#lonW").on("input", function() {
        lonW = this.value;
    })
    d3.select("#lonE").on("input", function() {
        lonE = this.value;
    })
    d3.select("#startDate").on("input", function() {
        startDate = this.value; 
    })
    d3.select("#endDate").on("input", function() {
        endDate = this.value;
    })
})


d3.json(url).then(run);

function run(dataset) {
    weatherJson = dataset.filter(storm => ((storm.lat > latS) && (storm.lat < latN) && (storm.lon < lonE) && (storm.lon > lonW))).filter(filterDate);
    console.log(weatherJson);

    // creating Markers for map
    createMarkers(weatherJson);

};
// ************************ Code for Leaflet Map ***********************
/*
    * Create the base map with GoogleStreet map and Satellite map
    * Using resulting 'weatherJson' JSON object from the picker selection:
        - create new JSON grouped by airport codes
        - count number of storms for each airport
        - create new column calculating duration of each storm
        - create color choosing function to be used with marker creation
        - create marker for each airport
            > Use color for each marker to show number of storms
            > Use average duration of storms to determine scale of marker
            > Use lat, lon data for marker location
            > create 'tooltip'/'hover over data'
        - Hover over data will include:
            > Airport ID code
            > # of storms
            > location: (lat, lon)
            > City, State, Zip
*/


// --------------------- create the base layers ---------------------------------------
// create street map base layer
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Map data 2023 ©Google</a> contributors'
});

// create Google Satellite base layer
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Map data 2023 ©Google</a> contributors'
});

// create a baseMaps object.
let baseMaps = {
    "Google Streets": googleStreets,
    "Satellite": googleSat,
};

// create the map
let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [googleStreets],
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);

function createMarkers(data) {
    // create durations
    for (let e = 0; e < data.length; e++) {
        let event = data[e];
        let end = new Date(event.endtime);
        let start = new Date(event.starttime);
        event["duration"] = end - start;
    };
    
    // create a new JSON array grouped by airport code
    let groupByAPCode = Object.groupBy(data, airport => {
        return airport.airportcode;
    });

    // verify new JSON object
    console.log(groupByAPCode);

    // use data for each feature to create a new
    createFeature(groupByAPCode);
}

// function to create marker features
function createFeature(apData) {
    // create an array fo string keys for the brouped by object
    const arrayOfKeys = Object.keys(apData).map(key => key);
    console.log(arrayOfKeys);
    // console.log(apData[arrayOfKeys[0]]);

    for (key of arrayOfKeys) {
        // console.log(apData[key]);
        data = apData[key];
        // console.log(data);
        let ap = data[0];
        // console.log(ap);
        let apID = ap.airportcode;
        let avgDuration = data.reduce((acc, doc) => {
             acc += doc.duration;
             return acc;
         }, 0) / data.length;
        let location = [ap.lat, ap.lon];
        let city = ap.city;
        let state = ap.state;
        let zip = ap.zipcode;
        let numStorms = data.length;

        // // choose color for marker based on number of storms
        let color = chooseColor(numStorms);

        // // add circles to map
        L.circle(location, {
            fillColor: color,
            fillOpacity: 0.9,
            color: color,
            weight: 0.5,
            //adjust radius
            radius: getRadius(avgDuration)
        }).bindPopup(`<h3>Airport ID: ${apID}</h3><hr><p>Location: ${location}</p><p>City: ${city}</p><p>State: ${state}</p><p>Zipcode: ${zip}</p>`).addTo(myMap);
    };
}

// function to limit radius size
function getRadius(duration) {
    check = duration / 100;
    if (check >= 65000) {
        return 65000;
    }
    else if (check <= 10000) {
        return 10000;
    }
    else {
        return check;
    }
}

// function to count # of JSON elements by keys
function countObjectKeys(obj) {
    return Object.keys(obj).length;
}

// function to choose marker color
function chooseColor(stormCount) {
    let color = "";
    if (stormCount >= 500) {
        color = "#000000"
    }
    else if (stormCount >= 200) {
        color = "#fc4653";
    }
    else if (stormCount >= 100) {
        color = "#faa921";
    }
    else if (stormCount >= 25) {
        color = "#f4d612";
    }
    else if (stormCount >= 10) {
        color = "#d5f70a";
    }
    else {
        color = "#96f909";
    }
    return color;
};
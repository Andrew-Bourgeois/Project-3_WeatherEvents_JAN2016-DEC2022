

const url = "http://127.0.0.1:5000/api/v1.0/weatherdata"
var latS = 25;
var latN = 50;
var lonW = -125;
var lonE = -65;
var startDate = '2016-01';
var endDate = '2023-01';

var weatherJson;
var markerGroup = L.featureGroup();

function filterDate(storm){
    const date = new Date(storm.starttime);           
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return date > startDate && date < endDate;
};

d3.select('button').on('click', function () {
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
    //Filter and update map
    let filteredWeather = filterJson(weatherJson);
    console.log(filteredWeather);
    createMarkers(filteredWeather);
})

function filterJson(json){//,latS,latN,lonE,lonW){
    let filteredWeather = json.filter(storm => ((storm.lat > latS) && (storm.lat < latN) && (storm.lon < lonE) && (storm.lon > lonW))).filter(filterDate);
    return(filteredWeather)
}


d3.json(url).then(run);

function run(dataset) {
    weatherJson = dataset;

    // creating Markers for map
    createMarkers(weatherJson);
    createLegend(myMap);

};
// ************************ Code for Leaflet Map ****************************
/*
    * Create the base map with GoogleStreet map and Satellite map
    * Using resulting 'weatherJson' JSON object from the picker selection:
        - create new JSON grouped by airport codes - COMPLETE
        - count number of storms for each airport - COMPLETE
        - create new column calculating duration of each storm - COMPLETE
        - create color choosing function to be used with marker creation  - COMPLETE
        - create marker for each airport
            > Use color for each marker to show number of storms - COMPLETE
            > Use average duration of storms to determine scale of marker - COMPLETE
                o create radius min/max limiting function for markers - COMPLETE
            > Use lat, lon data for marker location - COMPLETE
            > create 'tooltip'/'popup data' -COMPLETE
        - Popup data will include: - COMPLETE
            > Airport ID code
            > # of storms
            > location: (lat, lon)
            > City, State, Zip
*/

// --------------------- create the base layers -----------------------------
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

// --------------------------------------------------------------------------

// ----------------------- Create a layer control ---------------------------
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);

function createMarkers(data) {
    // create durations
    for (let e = 0; e < data.length; e++) {
        var event = data[e];
        var end = new Date(event.endtime);
        var start = new Date(event.starttime);
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
};
// --------------------------------------------------------------------------

// -------------- function to create marker features ------------------------
function createFeature(apData) {
    // create an array fo string keys for the brouped by object
    const arrayOfKeys = Object.keys(apData).map(key => key);

    //clear and update marker group
    myMap.removeLayer(markerGroup);
    markerGroup = L.featureGroup();

    // loop through grouped JSON using array of keys for reference
    for (key of arrayOfKeys) {
        data = apData[key];
        var ap = data[0];
        var apID = ap.airportcode;
        // calculate the average duration of storms
        var avgDuration = data.reduce((acc, doc) => {
             acc += doc.duration;
             return acc;
         }, 0) / data.length;
        var location = [ap.lat, ap.lon];
        var city = ap.city;
        var state = ap.state;
        var zip = ap.zipcode;
        var numStorms = data.length;

        // // choose color for marker based on number of storms
        var color = chooseColor(numStorms);

        // // add circles to map
        marker = L.circle(location, {
            fillColor: color,
            fillOpacity: 0.65,
            color: color,
            weight: 3.0,
            //adjust radius
            radius: getRadius(avgDuration)
        }).bindPopup(`<h3>Airport ID: ${apID}</h3><hr><p>Location: ${location}</p><p># of Storms: ${numStorms}</p><p>City: ${city}</p><p>State: ${state}</p><p>Zipcode: ${zip}</p>`).addTo(markerGroup);
    };
    myMap.addLayer(markerGroup);
}
// --------------------------------------------------------------------------

// ------------- function to limit radius size ------------------------------
// otherwise some storms last so long they cover the whole map.
// or are so short they barely show up
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
};
// --------------------------------------------------------------------------

// ----------- function to count # of JSON elements by keys -----------------
function countObjectKeys(obj) {
    return Object.keys(obj).length;
};

// ------------------ function to choose marker color -----------------------
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
// --------------------------------------------------------------------------

// ---------------------- function to create legend -------------------------
function createLegend(map) {
    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = () => {
        var div = L.DomUtil.create("div", "legend");
        labels = ['<strong># of Storms</strong>'],
        colors = ['#000000', '#fc4653', '#faa921', '#f4d612', '#d5f70a', '#96f909'],
        categories = ['500+', '200-500', '100-200', '25-100', '10-25', '<10'];
            
        for (let i = 0; i < categories.length; i++) {
            labels.push(
                `<i class="colorsquare" style="
                background: ${colors[i]}"></i> ${categories[i]}`
            );
        }
        div.innerHTML = labels.join('<br>');
        return div;
        
    };
    legend.addTo(map);
};
// --------------------------------------------------------------------------

// *************************** End of Map Code ******************************
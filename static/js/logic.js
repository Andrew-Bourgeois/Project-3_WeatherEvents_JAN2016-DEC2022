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
};

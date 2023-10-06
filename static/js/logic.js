const url = "http://127.0.0.1:5000/api/v1.0/weatherdata"

let weatherJson = d3.json(url).then(run);

function run(dataset) {
   //console.log(dataset)
};
console.log(weatherJson);
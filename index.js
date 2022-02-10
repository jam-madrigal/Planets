const { parse } = require('csv-parse'); 
const fs = require('fs');

// Array to store the results of our kepler data read with node's api
const results = [];

// Using node to read our kepler data csv file, adding handlers to push the results to an array and log them, as well as catch any errors
fs.createReadStream('kepler_data.csv')
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', (results) => {
        console.log(results);
        console.log("Done reading data stream")
    })
    

// parse();

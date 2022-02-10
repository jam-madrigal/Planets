const { parse } = require('csv-parse'); 
const fs = require('fs');

const results = [];

fs.createReadStream('kepler-data.csv')
    .on('data', (data) => {
        results.push(data);
    });
// parse();

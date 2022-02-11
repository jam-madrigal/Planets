const { parse } = require('csv-parse'); 
const fs = require('fs');

// Array to store the results of our kepler data read with node's api
const habitablePlanets = [];

// Function to filter the data for planets with a confirmed koi disposition property, and a habitable stellar flux value. The key/property can also be selected with dot notation
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
}


// Using node to read our kepler data csv file, adding handlers to push the resulting habitable planets to an array and log them, as well as catch any errors
// .pipe will send our kepler data to the parse function, piping similar to terminal commands like in linux, a readable stream (createReadStream()) providing the input for a writable stream (parse())
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        // Labeling that lines starting with # are comments, because different methods may handle parsing the data differently, and adding the columns key to return each row as a javascript object, this will make it return key value pairs instead of an array with the data values in each row
        comment: "#",
        columns: true
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanets);
        console.log("Done reading data stream")
    })
    

// parse();

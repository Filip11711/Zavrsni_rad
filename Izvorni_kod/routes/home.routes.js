const express = require('express');
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Home',
        message: ''
    });
});

router.post('/', async function (req, res, next) {
    const datetime = req.body.datetime
    const datetimevalue = req.body.datetime.split('-').join('').split(':').join('').split('T').join('')
    const jsonFilename = datetimevalue + '.json';
    const jsonPath = path.join(__dirname, '../public/python/Json_files', jsonFilename);

    if (fs.existsSync(jsonPath)) {
        // JSON file exists, redirect to /cesium and send the JSON data
        res.redirect('/cesium/' + datetime);
      } else {
        // Spawn Python script to create the JSON file
            const pythonScript = spawn('python', ['public/python/grib_opener.py', datetimevalue]);
            
            pythonScript.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(output); // Output the stdout data
            });

            pythonScript.stderr.on('data', (data) => {
                const scriptError = data.toString();
                console.log(scriptError)
            });

            pythonScript.on('close', (code) => {
            if (code === 0) {
                console.log("Success")
            } else {
                console.error(error);
            }
            });

            res.render('home', {
                title: 'Home',
                message: 'Izvršava se python skripta za vremenski trenutak ' + datetime + '. Molimo pokušajte ponovno za 3-4 minute ili odaberite drugi vremenski trenutak.'
            });
      }
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/:datetime', function (req, res, next) {
    const datetime = req.params.datetime;
    const datetimevalue = datetime.split('-').join('').split(':').join('').split('T').join('')
    const json_data = require('../public/python/Json_files/' + datetimevalue + '.json')
    res.render('cesium', {
        title: 'Cesium',
        data : json_data,
        datetime : datetime
    });
});

module.exports = router;
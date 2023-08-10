//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require('./routes/home.routes');
const cesiumRouter = require('./routes/cesium.routes')

//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definicija ruta
app.use('/', homeRouter);
app.use('/cesium', cesiumRouter)

//pokretanje poslužitelja na portu 3000
app.listen(3000, '0.0.0.0');


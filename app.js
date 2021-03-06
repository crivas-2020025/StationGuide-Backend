// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuarioRutas = require('./src/routes/usuario.routes');
const GasolineraRutas = require('./src/routes/gasolinera.routes');
const SucursalRutas = require('./src/routes/sucursal.routes');
const NoticiaRutas = require('./src/routes/noticia.routes');

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', UsuarioRutas, GasolineraRutas, SucursalRutas, NoticiaRutas);

module.exports = app;
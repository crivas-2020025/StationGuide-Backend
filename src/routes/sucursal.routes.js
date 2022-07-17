//IMPORTACIONES
const express = require('express');
const sucursalController = require('../controllers/sucursal.controller');
const md_autentificacion = require('../middlewares/autentificacion');
const md_roles = require('../middlewares/roles');

//ini
var api = express.Router();

//rutas
api.get('/obtenerSucursales',[md_autentificacion.Auth],sucursalController.ObtenerSucursales);
api.get('/obtenerSucursalId/:idSucursal',[md_autentificacion.Auth],sucursalController.ObtenerSucursalId);
api.post('/agregarSucursal',[md_autentificacion.Auth, md_roles.verAdmin],sucursalController.agregarSucursal);
api.put('/editarSucursal/:idSucursal',[md_autentificacion.Auth, md_roles.verAdmin],sucursalController.editarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autentificacion.Auth, md_roles.verAdmin],sucursalController.eliminarSucursal);

module.exports = api;
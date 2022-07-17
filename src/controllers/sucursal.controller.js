const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Sucursal = require('../models/sucursal.model');


function ObtenerSucursales (req, res) {

    Sucursal.find((err, sucursalesObtenidas) => {
        
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ sucursales: sucursalesObtenidas })
    })
}

function ObtenerSucursalId(req, res){
    var idSucursal = req.params.idSucursal;

    Sucursal.findById(idSucursal,(err,sucursalEncontrada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!sucursalEncontrada) return res.status(404).send( { mensaje: 'Error al obtener la sucursal' });

        return res.status(200).send({ sucursales: sucursalEncontrada });
    })
}

function agregarSucursal(req, res){
    var parametros = req.body;
    var sucursalModel = new Sucursal();
  
    if(parametros.nombreSucursal, parametros.direccion, parametros.departamento, parametros.super, parametros.regular, parametros.diesel){
        sucursalModel.nombreSucursal = parametros.nombreSucursal;
        sucursalModel.direccion = parametros.direccion;
        sucursalModel.departamento = parametros.departamento;
        sucursalModel.super = parametros.super;
        sucursalModel.regular = parametros.regular;
        sucursalModel.diesel = parametros.diesel;
        sucursalModel.idGasolinera = parametros.idGasolinera;
                Sucursal.find({nombreSucursal: parametros.nombreSucursal}
                ,(err, sucursalGuardada)=>{
                if(sucursalGuardada.length == 0){
                    sucursalModel.save((err, sucGuardada) => {
                            if(err) return res.status(500).send({mensaje: 'No se realizo la accion'});
                            if(!sucGuardada) return res.status(404).send({mensaje: 'No se agrego la sucursal'});
  
                            return res.status(201).send({sucursales: sucGuardada});
                         })
                }else{
                    return res.status(500).send({ mensaje: 'Error en la peticion' });
                }
            })
    }else{
            return res.status(500).send({ mensaje: 'Complete campos' });
    }
}

function editarSucursal(req, res){
    var idSucursal = req.params.idSucursal;
    var paramentros = req.body;

    Sucursal.findByIdAndUpdate({_id: idSucursal, nombreSucursal: paramentros.nombreSucursal}, paramentros,{new:true},
        (err, sucursalEditada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!sucursalEditada) return res.status(400).send({mensaje: 'No se puede editar la sucursal'});
                
            return res.status(200).send({sucursales: sucursalEditada});
    })
}


function eliminarSucursal(req, res){
    var idSucursal = req.params.idSucursal;

    Sucursal.findByIdAndDelete({_id: idSucursal},(err, sucursalEliminada)=>{
                
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!sucursalEliminada) return res.status(400).send({mensaje: 'No es puede eliminar la sucursal'});
                
            return res.status(200).send({sucursales: sucursalEliminada});
        })
}


module.exports = {
    ObtenerSucursales,
    agregarSucursal,
    ObtenerSucursalId,
    editarSucursal,
    eliminarSucursal
}
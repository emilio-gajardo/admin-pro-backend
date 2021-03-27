/** 24-03-2021
 * getTodo */

const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');


// Buscador de todas las colecciones
const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');
    const [hospitales, medicos, usuarios] = await Promise.all([
        Hospital.find({ nombre: regexp }),
        Medico.find({ nombre: regexp }),
        Usuario.find({ nombre: regexp }),
    ]);

    res.json({
        ok: true,
        hospitales,
        medicos,
        usuarios,
    });
}




// Buscador de todas las colecciones
const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i'); // i = insensible = flexible
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regexp })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regexp }).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regexp }).populate('usuario', 'nombre img');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Error: La tabla puede ser (usuarios o  medicos o hospitales), verifique'
            });
        
    }

    res.json({
        ok: true,
        resultados: data
    });
}




module.exports = { getTodo, getDocumentosColeccion }
// ej 23-03-2021

const { response } = require('express');
const Medico = require('../models/medico');

// listar médicos
const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                //.populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}




// crear nuevo médico
const crearMedico = async (req, res = response) => {

    const uid = req.uid;   
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });
    }

}













// actualizar médico
const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

// borrar médico
const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
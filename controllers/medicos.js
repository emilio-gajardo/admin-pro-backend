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
const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        // Verificar que exista el medico
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'El (ID) no esta asociado a un (Médico)'
            });
        }

        // Capturar campos
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        // Actualizar y guardar los cambios en la BD
        // {new: true} = mostrar los datos actualizados
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        // Respuesta del backend
        res.json({
            ok: true,
            msg: 'Médico actualizado exitosamente',
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error de actualización'
        });
    }
}




// borrar médico
const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id); // buscar medico por id

        // verificar que exista el id del medico
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Error: El (id) no esta asociado a un médico'
            });
        }

        await Medico.findByIdAndDelete(id); // Eliminacion del hospital por el id

        res.json({
            ok: true,
            msg: 'Médico eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de eliminación'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
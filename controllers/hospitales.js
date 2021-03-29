const { response } = require('express');
const Hospital = require('../models/hospital');

// listar hospitales
const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        hospitales
    });
}





// crear nuevo hospital
const crearHospital = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    //console.log('uid --> ', uid);


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: 'Hospital agregado exitosamente',
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });
    }

}






// Actualizar hospital
const actualizarHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);
        // Verificar que exista el hospital
        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'EL (ID) no esta asociado a un Hospital'
            });
        }

        // Caputrar campos
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        // Actualizar y guardar los cambios en la BD
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        // Respuesta del Backend
        res.json({
            ok: true,
            msg: 'Hospital actualizado exitosamente',
            hospital: hospitalActualizado
        });



    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de actualización'
        });
    }
}





// borrar hospital
const borrarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);
        // Verificar que exista el hospital
        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Error: EL (ID) no esta asociado a un Hospital'
            });
        }

        // Eliminacion del hospital por el id
        await Hospital.findByIdAndDelete(id);

        // Respuesta del Backend
        res.json({
            ok: true,
            msg: 'Hospital eliminado exitosamente'
        });



    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de ejecución'
        });
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
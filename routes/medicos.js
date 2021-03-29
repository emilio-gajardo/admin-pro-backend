/**
 * 23-03-2021
 * Médicos
 * Path: '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();

// Mostrar médicos
router.get('/', getMedicos);


// Agregar médicos
router.post('/',
    [
        validarJWT,
        check('nombre', 'El Nombre del Médico es obligatorio').not().isEmpty(),
        check('hospital', 'El ID del Hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);


// Actualizar médicos
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Debe ingresar el nombre del (Médico)').not().isEmpty(),
        check('hospital', 'El id del médico debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);


// Borrar médico
router.delete('/:id',
    borrarMedico
);


module.exports = router;
/**
 * 23-03-2021
 * Hospitales
 * Path: '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator'); // middleware
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();


// Mostrar hospitales
router.get('/', getHospitales);


// Agregar hospitales
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearHospital
);



// Actualizar hospitales
router.put('/:id',
    [
    ],
    actualizarHospital
);



// Borrar hospitales
router.delete('/:id',
    borrarHospital
);


module.exports = router;
// ej 20-03-2021
// req = lo que pide el cliente
// res = lo que responde el servidor
// Ruta Raiz: /api/usuarios



const { Router } = require('express');
const { check } = require('express-validator'); // middleware
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuarios');

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


// Mostrar usuarios
router.get('/', validarJWT, getUsuarios);


// Agregar usuarios
router.post('/',
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('password', 'El Password es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarCampos,
    ]
    , crearUsuario
);



// Actualizar usuarios
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('role', 'El Role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);



// Borrar usuarios
router.delete('/:id',
    // [
    //     check('id', 'El id es obligatorio').not().isEmpty(),
    // ],
    validarJWT,
    borrarUsuario
);


module.exports = router;
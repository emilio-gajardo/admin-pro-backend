/* 
    Path: '/api/login'
*/

const { Router } = require('express'); // importación
const { login } = require('../controllers/auth'); // importación
const { check } = require('express-validator'); // importación
const { validarCampos } = require('../middlewares/validar-campos'); // importación

const router = Router(); // declaración


// Validar login de usuarios
router.post('/',
    [
        check('email','El Email es obligatorio').isEmail(),
        check('password','El Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);





module.exports = router; // exportación
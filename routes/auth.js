/* 
    Path: '/api/login'
*/

const { Router } = require('express'); // importación
const { login, googleSingIn } = require('../controllers/auth'); // importación
const { check } = require('express-validator'); // importación
const { validarCampos } = require('../middlewares/validar-campos'); // importación

const router = Router(); // declaración


// Validar login de usuarios
router.post('/',
    [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);





// LOGIN API GOOGLE
router.post('/google',
    [
        check('token', 'El (token) de (google) es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
);


module.exports = router; // exportación
/**
 * 24-03-2021
 * ruta: api/upload/
 */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload'); // libreria externa
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
router.use(expressFileUpload()); // middleware
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen)


module.exports = router;
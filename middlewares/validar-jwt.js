const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')


const validarJWT = (req, res, next) => {

    // 1. leer token del header
    const token = req.header('x-token');

    // 2. validar token -> (401) -> código -> no autorizado
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token vacío'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('uid: ', uid);
        req.uid = uid;
        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
}



const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Advertencia, usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Advertencia de seguridad, usuario no autorizado'
            });
        }

        next();

    } catch (error) {
        console.log('error: ', error);
        
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}





const validarADMIN_ROLE_o_MismoUsuario = async(req, res, next) => {

    const uid = req.uid;

    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Advertencia, usuario no existe'
            });
        }


        // uid === id (se puede actualizar el mismo usuario)
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            
            next();

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Advertencia de seguridad, usuario no autorizado'
            });
        }

    } catch (error) {
        console.log('error: ', error);
        
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}




// Exportación
module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}

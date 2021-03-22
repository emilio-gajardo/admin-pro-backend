const jwt = require('jsonwebtoken');


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


module.exports = { validarJWT } // exportación
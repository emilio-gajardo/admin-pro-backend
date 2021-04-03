const { response } = require('express'); // importación
const Usuario = require('../models/usuario'); // importación
const bcrypt = require('bcryptjs'); // importacion
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google.verify');



const login = async (req, res = respones) => {

    const { email, password } = req.body;
    try {
        // verificacion email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email inválido'
            });
        }
        // verificación de clave
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password inválido'
            });
        }

        // Generar token o json web token JWT
        const token = await generarJWT(usuarioDB.id);

        // enviar token
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}








// Validacion de token de google
const googleSingIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        // En el caso que "NO exista" el usuario
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

            // En el caso que "SI exista" el usuario
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar al usuario en la BD
        await usuario.save();

        // Generar token o json web token JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Token válido',
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
}



// Renovar token
const renewToken = async (req, res = response) => {

    const uid = req.uid; // uid del usuario
    const token = await generarJWT(uid); // Generar nuevo token

    // Obtener al usuario por UID
    const usuarioDB = await Usuario.findById(uid);


    res.json({
        ok: true,
        token,
        usuarioDB
    });
}





module.exports = {
    login,
    googleSingIn,
    renewToken
} // exportación
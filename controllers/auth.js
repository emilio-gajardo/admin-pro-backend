const { response } = require('express'); // importación
const Usuario = require('../models/usuario'); // importación
const bcrypt = require('bcryptjs'); // importacion
const { generarJWT } = require('../helpers/jwt');


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


module.exports = { login } // exportación
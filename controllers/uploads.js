// 24-03-2021
const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');




const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;



    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo inválido, debe ser (hospital o medico o usuario)'
        });
    }


    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }



    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; // aquí se extrae el tipo de archivo




    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo (No) es una extensión permitida'
        });
    }


    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;


    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }



        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);




        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}



// Controlador para mostrar imagen
const retornaImagen = (req, res = respuesta) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/imagen no disponible.jpg`);
        res.sendFile(pathImg);
    }
}


module.exports = { fileUpload, retornaImagen }
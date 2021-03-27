// 25-03-2021

//Importaciones
const fs = require('fs'); // (fs = file system) para leer los carpetas y archivos del sistema
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    // si es true en la consola significa que si encontro y existe el archivo
    // console.log(fs.existsSync(pathViejo)); 
    // console.log(pathViejo);
    // borrar imagen anterior
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {

        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('El ID no es de un médico o no existe, verifique');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`; // verificar path viejo
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;



        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('El ID no es de un hospital o no existe, verifique');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`; // verificar path viejo
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;



        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('El ID no es de un usuario o no existe, verifique');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`; // verificar path viejo
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }
}


module.exports = { actualizarImagen } // exportacion
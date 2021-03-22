// ej 20-03-2021
const { Schema, model } = require('mongoose');

// definición del esquema
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    img: {
        type: String
    },

    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },

    google: {
        type: Boolean,
        default: false
    },

});


// transformación visual del formato del (_id) a (uid)
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


// definición del modelo
module.exports = model('Usuario', UsuarioSchema);
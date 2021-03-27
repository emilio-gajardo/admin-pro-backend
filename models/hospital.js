// ej 23-03-2021
const { Schema, model } = require('mongoose');

// definición del esquema
const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},
    { collection: 'hospitales' }
);


// transformación visual del formato del (_id) a (uid)
HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})


// definición del modelo
module.exports = model('Hospital', HospitalSchema);
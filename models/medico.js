// ej 23-03-2021

const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
},
    { collection: 'medicos' }
);


MedicoSchema.method('toJson', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Medico', MedicoSchema);
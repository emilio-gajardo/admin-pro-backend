// 19-03-2021

const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async () => {

    try {
        // await = esteperar a que todo el argumento se ejecute
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error de conexión con BD'); // detener toda la ejecución
    }
}

module.exports = {
    dbConnection
}
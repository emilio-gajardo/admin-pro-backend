// ej 18-03-2021

// ============================================================================
// importación de librerías
require('dotenv').config(); // Integrar variables de entorno en node
const express = require('express');
const { dbConnection } = require('./database/config');
const app = express(); // Creación del servidor de express
const cors = require('cors');
// ============================================================================


// use = middleware -> funcion que se ejecuta siempre para todas las sentencias posteriores, por ejp. cada vez que se realice una petición
app.use(cors()); // Configurar CORS

dbConnection(); // Base de datos

//console.log(process.env); // impresion de todas las variables de entorno de node


// Rutas
// req = lo que pide el cliente
// res = lo que responde el servidor
app.get('/', (req, res) => {
    res.json({
        ok: true,
        mgs: 'Hola mundo'
    });
});



app.listen(process.env.PORT, () => {
    console.log('Servidor ejecutando en puerto ' + process.env.PORT);
});
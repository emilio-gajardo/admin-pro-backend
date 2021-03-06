// ej 18-03-2021

// ============================================================================
// importación de librerías
require('dotenv').config(); // Integrar variables de entorno en node
const path = require('path');
const express = require('express');
const { dbConnection } = require('./database/config');
const app = express(); // Creación del servidor de express
const cors = require('cors');
// ============================================================================


// use = middleware -> funcion que se ejecuta siempre para todas las sentencias posteriores, por ejp. cada vez que se realice una petición
app.use(cors()); // Configurar CORS

app.use(express.json()); // lectura y parseo del body

dbConnection(); // Base de datos

//console.log(process.env); // impresion de todas las variables de entorno de node


/*------------------------------------------------*/
// Directorio publico
app.use(express.static('public'));
/*------------------------------------------------*/

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


// manejador de rutas desplegadas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



app.listen(process.env.PORT, () => {
    console.log('Servidor ejecutando en puerto ' + process.env.PORT);
});
const express = require('express');
const connectDB = require('./src/config/db');
const methodOverride = require('method-override');
const app = express();
const port = 5602;
require('dotenv').config();

connectDB();
// Middleware para leer el body de las peticiones de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para parsear application/json
app.use(methodOverride('_method'));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Importar rutas
const rutas = require('./src/routes/productRoutes'); // Asume que tienes un archivo `rutas.js`
app.use('/', rutas);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const express = require('express');
const app = express();
const port = 3000;

// Middleware para leer el body de las peticiones de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para parsear application/json

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Importar rutas
const rutas = require('./rutas'); // Asume que tienes un archivo `rutas.js`
app.use('/api', rutas);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
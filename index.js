const express = require('express');
const connectDB = require('./src/config/db');
const methodOverride = require('method-override');
const productController = require('./src/controllers/productController'); // Adicione esta linha
const productRoutes = require('./src/routes/productRoutes'); // Use esta importação para as rotas
const app = express();
const port = 5693;
require('dotenv').config();

connectDB();

// Middleware para ler o corpo das requisições de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para analisar application/json
app.use(methodOverride('_method'));

// Defina a rota raiz para usar o controlador de produtos
app.get('/', productController.showProducts);

// Use as rotas de produtos importadas
app.use('/', productRoutes);

// Servir arquivos estáticos deve vir após as definições de rotas
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
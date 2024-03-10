const express = require('express');
const session = require('express-session');
const connectDB = require('./src/config/db');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const productController = require('./src/controllers/productController'); // Adicione esta linha
const productRoutes = require('./src/routes/productRoutes'); // Use esta importação para as rotas
const authRoutes = require('./src/routes/authRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
const app = express();
const port = 5676;
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
app.use('/', authRoutes);
app.use('/', apiRoutes)
// Servir arquivos estáticos deve vir após as definições de rotas
app.use(express.static('public'));


app.use(session({
  secret: 'seuSegredoDeSessao',
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Configurando o connect-mongo
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // para HTTPS, use { secure: true }
}));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
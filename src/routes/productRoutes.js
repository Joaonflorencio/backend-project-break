const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Rota para a página inicial que redireciona para /products
router.get('/', (req, res) => {
  res.redirect('/products');
});

// Rotas para produtos
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);

// Rotas para autenticação
router.get('/login', authController.showLoginForm);
router.post('/login', authController.processLogin); // Certifique-se de que processLogin está definido em authController
router.get('/logout', authController.processLogout); // Certifique-se de que processLogout está definido em authController

// Rotas para exibir produtos por categoria
router.get('/camisetas', productController.showCamisetas);
router.get('/pantalones', productController.showPantalones);
router.get('/zapatos', productController.showZapatos);
router.get('/accesorios', productController.showAccesorios);

// Rotas para o dashboard/administração
router.get('/dashboard', productController.showProducts); // Reutiliza showProducts para o dashboard
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.post('/dashboard/:productId', productController.updateProduct); // Certifique-se de que updateProduct está definido em productController
router.post('/dashboard/:productId/delete', productController.deleteProduct); // Certifique-se de que deleteProduct está definido em productController

module.exports = router;
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

// Rota para exibir camisetas
router.get('/camisetas', productController.showCamisetas);

// Rota para exibir pantalones
router.get('/pantalones', productController.showPantalones);
// Rota para exibir zapatos
router.get('/zapatos', productController.showZapatos);

// Rota para exibir accesorios
router.get('/accesorios', productController.showAccesorios);

router.get('/products/:productId', productController.showProductPage);

router.get('/login', authController.showLoginForm);
router.post('/login', authController.processLogin);
router.get('/login', authController.showLoginForm);

// Rotas para dashboard/administración
router.get('/dashboard', productController.showProducts); // Reutiliza showProducts para o dashboard
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId', productController.showProductById); // Reutiliza showProductById para detalle em dashboard
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.post('/dashboard/:productId', productController.updateProduct); // Usamos POST para atualizar devido a limitações de HTML
router.post('/dashboard/:productId/delete', productController.deleteProduct); // Usamos POST para deletar

module.exports = router;
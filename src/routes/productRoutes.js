const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para a página inicial que redireciona para /products
router.get('/', (req, res) => {
  res.redirect('/products');
});

// Rutas para productos
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);


// Rutas para dashboard/administración
router.get('/dashboard', productController.showProducts); // Reutiliza showProducts para el dashboard
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId', productController.showProductById); // Reutiliza showProductById para detalle en dashboard
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.post('/dashboard/:productId', productController.updateProduct); // Usamos POST para actualizar debido a limitaciones de HTML
router.post('/dashboard/:productId/delete', productController.deleteProduct); // Usamos POST para eliminar

module.exports = router;
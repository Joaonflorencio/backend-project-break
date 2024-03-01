const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const productController = require('../controllers/productController');
=======
const Product = require("../models/Product");

//CREAR UN NUEVO PRODUCTO
router.post('/dashboard', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to create a new product"});
    }
})

//Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

/*
router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        console.error(error);
    }
});
*/

//estoy probando mi primer pull
>>>>>>> 25196d893ab6bb03345e3102b78271cdfe940d1a

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
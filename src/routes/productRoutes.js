const express = require('express')
const router = express.Router();
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





module.exports = router;
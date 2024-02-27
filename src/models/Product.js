const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: String,
    description: String,
    imagen: String,
    categoría: String,
    talla: String,
    precio: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    category: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'] },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] },
    price: Number,
    discount: { type: Number, default: 0 } // Novo campo para desconto, padrão é 0
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Nombre: String,
  Descripcion: String,
  Imagen: String, // Cambiado de Image a String para almacenar URLs
  Categoría: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'] },
  Talla: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] },
  Precio: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
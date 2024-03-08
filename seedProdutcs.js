require('dotenv').config();
const mongoose = require('mongoose'); // Importar Mongoose
const connectDB = require('./src/config/db');
const Product = require('./src/models/Product'); // Asegúrate de que la ruta sea correcta

const products = [
    { name: 'Zapatos con clase', description: 'Cómodos y elegantes / Nº 42', price: 39.99, discount: 20, image: 'images/img4.jpg', category: 'Zapatos' },
    { name: 'Camiseta', description: 'Casual y moderna / Talla: S', price: 19.99, discount: 10, image: 'images/img2.jpg', category: 'Camisetas' },
    { name: 'Pantalón', description: 'Atrévete con estos / Talla : M', price: 49.99, discount: 10, image: 'images/img3.jpg', category: 'Pantalones' },
    { name: 'Gorra', description: 'Estilo único', price: 29.99, discount: 5, image: 'images/img1.jpg', category: 'Accesorios' }
];

const seedProducts = async () => {
    await connectDB(); // Conectar a MongoDB
    
    try {
        await Product.deleteMany({}); // Opcional: limpiar la colección antes de insertar
        await Product.insertMany(products);
        console.log('Productos añadidos con éxito.');
    } catch (error) {
        console.error('Error al añadir productos:', error);
    } finally {
        // Desconectar de MongoDB después de la inserción o si ocurre un error
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB.');
    }
};

seedProducts();
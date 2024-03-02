const Product = require('../models/Product');

// Funciones auxiliares para generar HTML
const baseHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>
<body>`;

const getNavBar = () => `
    <nav>
        <ul>
            <li><a href="/products">Productos</a></li>
            <li><a href="/camisetas">Camisetas</a></li>
            <li><a href="/pantalones">Pantalones</a></li>
            <li><a href="/zapatos">Zapatos</a></li>
            <li><a href="/accesorios">Accesorios</a></li>
            <li><a href="/login">Login</a></li>
        </ul>
    </nav>`;

    const getProductCards = () => {
        // Array estático de produtos para exemplo
        const products = [
            { _id: 1, Nombre: 'Zapatos con clase', Descripcion: 'Cómodos y elegantes', Precio: 39.99, Imagen: 'images/img4.jpg' },
            { _id: 2, Nombre: 'Camiseta', Descripcion: 'Casual y moderna', Precio: 19.99, Imagen: 'images/img2.jpg' },
            { _id: 3, Nombre: 'Pantalón', Descripcion: 'Atrévete con estos', Precio: 49.99, Imagen: 'images/img3.jpg' },
            { _id: 4, Nombre: 'Gorra', Descripcion: 'Estilo único', Precio: 29.99, Imagen: 'images/img1.jpg' },
        ];
    
        let html = '<div style="display: flex; flex-wrap: wrap; justify-content: center;">';
        for (let product of products) {
            html += `
            <div style="width: 300px; margin: 10px; text-align: center;">
                <img src="/${product.Imagen}" alt="${product.Nombre}" style="width: 100%; height: auto;">
                <h3>${product.Nombre}</h3>
                <p>${product.Descripcion}</p>
                <p>${product.Precio}€</p>
                <a href="/products/${product._id}">Ver</a>
            </div>
            `;
        }
        html += '</div>';
        return html;
    };

// Controlador
exports.showProducts = async (req, res) => {
    try {
        // Usamos getProductCards sem passar produtos, já que agora é estático
        const productCards = getProductCards();
        const html = baseHtml + getNavBar() + productCards + '</body></html>';
        res.send(html);
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};

exports.showProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const productCard = getProductCards([product]); // Usamos el mismo método para un producto
    const html = baseHtml + getNavBar() + productCard + '</body></html>';
    res.send(html);
};

exports.showNewProduct = (req, res) => {
    const formHtml = baseHtml + getNavBar() + `
        <form action="/dashboard" method="post">
            <!-- Campos del formulario -->
            <input type="submit" value="Subir Producto">
        </form>
    ` + '</body></html>';
    res.send(formHtml);
};

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/dashboard');
};

exports.showEditProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const formHtml = baseHtml + getNavBar() + `
        <form action="/dashboard/${product._id}" method="post">
            <!-- Campos del formulario con valores predeterminados del producto -->
            <input type="submit" value="Actualizar Producto">
        </form>
    ` + '</body></html>';
    res.send(formHtml);
};

exports.updateProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    res.redirect('/dashboard');
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/dashboard');
};
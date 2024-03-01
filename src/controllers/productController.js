const Product = require('../models/Product');

// Funciones auxiliares para generar HTML
const baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <style>
        /* Estilos básicos */
        .product-card { margin: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        img { max-width: 100px; max-height: 100px; }
    </style>
</head>
<body>`;

const getNavBar = () => `
    <nav>
        <ul>
            <li><a href="/products">Inicio</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard/new">Subir Producto</a></li>
        </ul>
    </nav>`;

const getProductCards = (products) => {
    let html = '<div class="products-container">';
    for (let product of products) {
        html += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <a href="/products/${product._id}">Ver detalle</a>
        </div>
        `;
    }
    html += '</div>';
    return html;
};

// Controlador
exports.showProducts = async (req, res) => {
    const products = await Product.find();
    const productCards = getProductCards(products);
    const html = baseHtml + getNavBar() + productCards + '</body></html>';
    res.send(html);
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
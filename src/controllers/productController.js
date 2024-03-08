const Product = require('../models/Product');

// Funções auxiliares para gerar HTML
const baseHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <link rel="stylesheet" href="/styles.css">
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
            <li><a href="/registro">Registro</a></li>
        </ul>
    </nav>`;
    const getProductCards = (products) => {
        let html = '<div class="product-container">';
        for (let product of products) {
            // Assegure que price e discount são números antes de tentar calcular o desconto
            if (typeof product.price === 'number' && typeof product.discount === 'number') {
                const precioDescuento = (product.price - (product.price * (product.discount / 100))).toFixed(2);
                html += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="price-info">
                            <span class="original-price">${product.price.toFixed(2)}€</span>
                            <span class="discount">(-${product.discount}%)</span>
                            <span class="discounted-price">${precioDescuento}€</span>
                        </div>
                        <a href="${product.image}" target="_blank">Ver</a>
                    </div>
                `;
            } else {
                console.error('Erro: Produto sem preço ou desconto definido', product);
            }
        }
        html += '</div>';
        return html;
    };;
    
// Controlador
exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Busca todos os produtos no banco de dados
        const productCards = getProductCards(products);
        const html = baseHtml + getNavBar() + productCards + '</body></html>';
        res.send(html);
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};

exports.showProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const productCard = getProductCards([product]); // Usamos o mesmo método para um produto
    const html = baseHtml + getNavBar() + productCard + '</body></html>';
    res.send(html);
};

exports.showNewProduct = (req, res) => {
    const formHtml = baseHtml + getNavBar() + `
        <form action="/dashboard" method="post">
            <!-- Campos do formulário -->
            <input type="submit" value="Subir Producto">
        </form>
    ` + '</body></html>';
    res.send(formHtml);
};

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.price) {
            res.status(400).send('Nome e preço do produto são obrigatórios');
            return;
        }
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.price) {
            res.status(400).send('Nome e preço do produto são obrigatórios');
            return;
        }
        await Product.findByIdAndUpdate(req.params.productId, req.body);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};

exports.showEditProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const formHtml = baseHtml + getNavBar() + `
        <form action="/dashboard/${product._id}" method="post">
            <!-- Campos do formulário com valores pré-definidos do produto -->
            <input type="submit" value="Actualizar Producto">
        </form>
    ` + '</body></html>';
    res.send(formHtml);
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/dashboard');
};

const showProductsByCategoryMiddleware = (category) => {
    return async (req, res) => {
        try {
            // A chave da consulta aqui deve corresponder exatamente ao campo definido no seu esquema de Produto
            const products = await Product.find({ category: category }); // A chave "category" deve ser a mesma que no esquema

            if (products.length === 0) {
                res.send('No se encontraron productos en esta categoría');
                return;
            }

            const productCards = getProductCards(products);
            const html = baseHtml + getNavBar() + productCards + '</body></html>';
            res.send(html);
        } catch (error) {
            res.status(500).send('Error del servidor: ' + error.message);
        }
    };
};

// Funções que usam o middleware para as categorias específicas
exports.showCamisetas = showProductsByCategoryMiddleware('Camisetas');
exports.showPantalones = showProductsByCategoryMiddleware('Pantalones');
exports.showZapatos = showProductsByCategoryMiddleware('Zapatos');
exports.showAccesorios = showProductsByCategoryMiddleware('Accesorios');

exports.showProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const html = baseHtml + `
            <div class="product-page">
                <img src="${product.Imagen}" alt="${product.Nombre}">
            </div>
        ` + '</body></html>';
        res.send(html);
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};
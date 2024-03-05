const Product = require('../models/Product');

// Funciones auxiliares para generar HTML
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
        </ul>
    </nav>`;

    const getProductCards = (products) => {
        let html = '<div class="product-container">';
        for (let product of products) {
            const precioDescuento = (product.Precio - (product.Precio * (product.Descuento / 100))).toFixed(2);
            html += `
                <div class="product-card">
                    <img src="${product.Imagen}" alt="${product.Nombre}">
                    <h3>${product.Nombre}</h3>
                    <p>${product.Descripcion}</p>
                    <div class="price-info">
                        <span class="original-price">${product.Precio.toFixed(2)}€</span>
                        <span class="discount">(-${product.Descuento}%)</span>
                        <span class="discounted-price">${precioDescuento}€</span>
                    </div>
                    <a href="${product.Imagen}" target="_blank">Ver</a> <!-- Link para abrir a imagem em uma nova guia -->
                </div>
            `;
        }
        html += '</div>';
        return html;
    };
// Controlador
exports.showProducts = async (req, res) => {
    try {
        // Usar a lista estática de produtos para exemplo
        const products = [
            { _id: 1, Nombre: 'Zapatos con clase', Descripcion: 'Cómodos y elegantes / Nº 42', Precio: 39.99, Descuento: 20, Imagen: 'images/img4.jpg' },
            { _id: 2, Nombre: 'Camiseta', Descripcion: 'Casual y moderna / Talla: S ', Precio: 19.99, Descuento: 10, Imagen: 'images/img2.jpg' },
            { _id: 3, Nombre: 'Pantalón', Descripcion: 'Atrévete con estos / Talla : M', Precio: 49.99, Descuento: 10, Imagen: 'images/img3.jpg' },
            { _id: 4, Nombre: 'Gorra', Descripcion: 'Estilo único', Precio: 29.99, Descuento:5, Imagen: 'images/img1.jpg' },
        ];
        const productCards = getProductCards(products);
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

const showProductsByCategory = async (req, res, category) => {
    try {
        // Lista de todos os produtos
        const allProducts = [
            { _id: 1, Nombre: 'Zapatos con clase', Descripcion: 'Cómodos y elegantes / Nº 42', Precio: 39.99, Descuento: 20, Imagen: 'images/img4.jpg', Categoria: 'Zapatos' },
           { _id: 2, Nombre: 'Camiseta', Descripcion: 'Casual y moderna / Talla: S ', Precio: 19.99, Descuento: 10, Imagen: 'images/img2.jpg', Categoria: 'Camisetas' },
           { _id: 3, Nombre: 'Pantalón', Descripcion: 'Atrévete con estos / Talla : M', Precio: 49.99, Descuento: 10, Imagen: 'images/img3.jpg', Categoria: 'Pantalones' },
           { _id: 4, Nombre: 'Gorra', Descripcion: 'Estilo único', Precio: 29.99, Descuento:5, Imagen: 'images/img1.jpg', Categoria: 'Accesorios' },
];

          

        // Filtrar os produtos pela categoria desejada
        const filteredProducts = allProducts.filter(product => product.Categoria === category);

        // Verificar se há produtos na categoria especificada
        if (filteredProducts.length === 0) {
            res.send('Nenhum produto encontrado nesta categoria');
            return;
        }

        // Renderizar os produtos na página
        const productCards = getProductCards(filteredProducts);
        const html = baseHtml + getNavBar() + productCards + '</body></html>';
        res.send(html);
    } catch (error) {
        res.status(500).send('Server Error: ' + error.message);
    }
};

exports.showCamisetas = (req, res) => {
    showProductsByCategory(req, res, 'Camisetas');
};

exports.showPantalones = (req, res) => {
    showProductsByCategory(req, res, 'Pantalones');
};

exports.showZapatos = (req, res) => {
    showProductsByCategory(req, res, 'Zapatos');
};

exports.showAccesorios = (req, res) => {
    showProductsByCategory(req, res, 'Accesorios');
};

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
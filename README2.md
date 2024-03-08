# Tienda de ropa

Esta aplicación es una tienda de ropa con un catálogo de productos y un panel de administración para el administrador. Los productos se guardan en una base de datos MongoDB en Atlas.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- bcrypt.js (para el hashing de contraseñas)
- HTML
- CSS
- Javascript

## Instrucciones de Uso

### Configuración del Entorno

1. **Clonación del Repositorio**: Clona este repositorio en tu máquina local.

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. **Instalación de Dependencias**: Instala las dependencias del proyecto utilizando el siguiente comando:

    ```bash
    npm install
    ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

```plaintext
MONGO_URI=tu_uri_de_MongoDB
SESSION_SECRET=tu_secreto_de_sesión

## Iniciar la Aplicación

Para iniciar la aplicación, ejecuta el siguiente comando:

```bash
npm start

La aplicación estará disponible en http://localhost:5666.

### Funcionalidades
Catálogo de Productos: Los usuarios pueden navegar por el catálogo de productos y ver detalles individuales de cada producto.

Inicio de Sesión: Los usuarios pueden iniciar sesión utilizando su dirección de correo electrónico y contraseña.

Panel de Administración: Los administradores pueden acceder a un panel de administración donde pueden agregar, editar y eliminar productos.

Seguridad: Las contraseñas de los usuarios se almacenan de forma segura utilizando hash bcrypt.

Persistencia de Datos: Los datos de productos se almacenan en una base de datos MongoDB.

Archivos Relevantes
package.json: Este archivo contiene la lista de dependencias del proyecto, así como scripts para iniciar la aplicación y ejecutar pruebas.

index.js: El archivo principal del servidor donde se inicia la aplicación Express y se configuran las rutas y middleware.

.env: Archivo de configuración que contiene variables de entorno sensibles como la URI de MongoDB y el secreto de sesión.

models/Product.js: Define el modelo de datos para los productos de la tienda.

controllers/productController.js: Contiene la lógica de negocio relacionada con los productos, como la creación, edición y eliminación de productos.
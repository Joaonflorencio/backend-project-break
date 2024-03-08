Tienda de Ropa
Esta aplicación es una tienda de ropa con un catálogo de productos y un panel de administración para el administrador. Los productos se guardan en una base de datos MongoDB en Atlas.

Tecnologías Utilizadas
Node.js
Express.js
MongoDB
bcrypt.js (para el hashing de contraseñas)
HTML
CSS
Instrucciones de Uso
Configuración del Entorno
Clonación del Repositorio: Clona este repositorio en tu máquina local.

bash
Copy code
git clone https://github.com/tu_usuario/tu_repositorio.git
Instalación de Dependencias: Instala las dependencias del proyecto utilizando el siguiente comando:

Copy code
npm install
Variables de Entorno: Crea un archivo .env en la raíz del proyecto y define las siguientes variables de entorno:

plaintext
Copy code
MONGO_URI=tu_uri_de_MongoDB
SESSION_SECRET=tu_secreto_de_sesión
Iniciar la Aplicación
Para iniciar la aplicación, ejecuta el siguiente comando:

bash
Copy code
npm start
La aplicación estará disponible en http://localhost:5666.

Funcionalidades
Catálogo de Productos: Los usuarios pueden navegar por el catálogo de productos y ver detalles individuales de cada producto.

Inicio de Sesión: Los usuarios pueden iniciar sesión utilizando su dirección de correo electrónico y contraseña.

Panel de Administración: Los administradores pueden acceder a un panel de administración donde pueden agregar, editar y eliminar productos.

Seguridad: Las contraseñas de los usuarios se almacenan de forma segura utilizando hash bcrypt.

Persistencia de Datos: Los datos de productos se almacenan en una base de datos MongoDB.

Controladores y Rutas
El proyecto utiliza los siguientes controladores y rutas:

productController.js: Controlador para operaciones relacionadas con productos.
authController.js: Controlador para operaciones de autenticación de usuarios.
productRoutes.js: Definición de rutas para las operaciones de productos.
authRoutes.js: Definición de rutas para las operaciones de autenticación.
Seed de Productos
El archivo seedProducts.js contiene una función para añadir productos de ejemplo a la base de datos MongoDB.

Modelo de Usuario
El archivo User.js define el modelo de usuario utilizado para almacenar información de los usuarios en la base de datos.

Modelo de Producto
El archivo Product.js define el modelo de producto utilizado para almacenar información de los productos en la base de datos
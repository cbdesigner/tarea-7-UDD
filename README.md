# Urban Threads - E-Commerce Fullstack

Aplicacion fullstack de comercio electronico para una tienda de ropa. Proyecto final del bootcamp de desarrollo web UDD.

## Descripcion

Urban Threads es una tienda de ropa en linea que permite a los usuarios explorar un catalogo de productos, registrarse, iniciar sesion, agregar productos al carrito de compras y completar pagos a traves de Stripe. La aplicacion cuenta con autenticacion JWT, rutas protegidas y un panel de perfil de usuario.

## Tech Stack

### Frontend
- **React** (con Vite) - Libreria principal
- **React Router DOM** - Manejo de rutas
- **Context API** (useContext + useReducer) - Manejo de estado global
- **TailwindCSS** - Framework de estilos
- **Axios** - Llamadas HTTP a la API

### Backend
- **Node.js** + **Express.js** - Servidor y framework
- **MongoDB** + **Mongoose** - Base de datos y ODM
- **JSON Web Tokens (JWT)** - Autenticacion
- **bcryptjs** - Hash de contrasenas
- **Stripe** - Pasarela de pagos
- **Swagger** (swagger-jsdoc + swagger-ui-express) - Documentacion de API
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno

## Funcionalidades

- Catalogo de productos con filtro por categorias (Men, Women, Shoes, Accessories, Electronics, Jewelery)
- Pagina de detalle de producto con selector de talla, color y cantidad
- **Panel de administracion de productos** (crear, editar, eliminar) - ruta `/admin/products`
- Registro e inicio de sesion de usuarios
- Autenticacion con JWT y rutas protegidas
- Carrito de compras persistente (localStorage)
- Pasarela de pagos con Stripe (modo test)
- Perfil de usuario
- Documentacion de API con Swagger
- Diseno responsive (mobile-first)

## Estructura del Proyecto

```
proyecto/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/        # Login, Register
│   │   │   ├── Checkout/    # Checkout, Success, Cancel
│   │   │   ├── Home/        # Pagina principal
│   │   │   ├── Layout/      # Navbar, Footer, Alert
│   │   │   ├── Products/    # ProductList, ProductCard, ProductDetail, ProductAdmin
│   │   │   └── Profile/     # Perfil de usuario
│   │   ├── config/          # axios.js, token.js
│   │   ├── context/         # Alert, Product, User (Context + Reducer + State)
│   │   ├── routes/          # Auth.jsx, Private.jsx (guards)
│   │   ├── Router.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                  # Backend (Express.js)
│   ├── config/              # db.js, initialMock.js
│   ├── controllers/         # userController, productController, checkoutController
│   ├── middleware/           # authorization.js (JWT)
│   ├── models/              # User.js, Product.js, Order.js
│   ├── routes/              # users.js, products.js, checkout.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

## Instalacion Local

### Requisitos previos
- Node.js (v18+)
- MongoDB (local o Atlas)
- Cuenta de Stripe (modo test)

### 1. Clonar el repositorio
```bash
git clone https://github.com/cbdesigner/tarea-7-UDD.git
cd tarea-7-UDD
```

### 2. Configurar el backend
```bash
cd server
npm install
```

Crear archivo `.env` en `server/` con las siguientes variables (las credenciales se entregan por separado):
```
PORT=5000
MONGODB_URI=<se entrega por separado>
JWT_SECRET=<se entrega por separado>
STRIPE_SECRET_KEY=<se entrega por separado>
STRIPE_WEBHOOK_SECRET=<se entrega por separado>
CLIENT_URL=http://localhost:5173
```

> **Nota para evaluadores:** Las credenciales del archivo `.env` fueron enviadas por correo/mensaje junto con la entrega del proyecto.

### 3. Configurar el frontend
```bash
cd ../client
npm install
```

Crear archivo `.env` en `client/` (dejar vacio para desarrollo local):
```
VITE_REACT_APP_BACKEND_URL=
```

### 4. Ejecutar la aplicacion

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

La aplicacion estara disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Swagger Docs: http://localhost:5000/api-docs

### Credenciales de prueba (usuario demo)

Si no quieres registrarte, puedes iniciar sesion con el usuario creado por defecto:

| Campo      | Valor                     |
|-----------|---------------------------|
| **Email** | `demo@urbanthreads.com`   |
| **Password** | `demo123`              |

## API Endpoints

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/users/register | Registrar usuario | No |
| POST | /api/users/login | Iniciar sesion | No |
| GET | /api/users/verify | Verificar token y obtener usuario | Si |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/products | Obtener todos los productos | No |
| GET | /api/products/:id | Obtener producto por ID | No |
| POST | /api/products | Crear producto | Si |
| PUT | /api/products/:id | Actualizar producto | Si |
| DELETE | /api/products/:id | Eliminar producto | Si |

### Checkout
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/checkout | Crear sesion de pago Stripe | Si |
| POST | /api/checkout/webhook | Webhook de Stripe | No |
| GET | /api/checkout/orders | Obtener ordenes del usuario | Si |

## Catálogo de productos

El catalogo combina dos fuentes de productos:

1. **Fake Store API** ([fakestoreapi.com](https://fakestoreapi.com/products)) - Productos de ejemplo (solo lectura). No requiere registro ni API key.
2. **MongoDB** - Productos creados desde el panel de administracion (CRUD completo).

- **Categorias:** Men, Women, Electronics, Jewelery, Shoes, Accessories.
- Los productos de MongoDB aparecen primero y son editables/eliminables desde el panel Admin.
- Los productos de Fake Store API son de solo lectura.

## Stripe Test Mode

Para probar pagos, usar la tarjeta de prueba de Stripe:
- Numero: `4242 4242 4242 4242`
- Fecha: cualquier fecha futura
- CVC: cualquier 3 digitos

## Despliegue

La aplicacion esta desplegada en:
- **Frontend**: Render (Static Site)
- **Backend**: Render (Web Service)
- **Base de datos**: MongoDB Atlas

URLs de produccion:
- **App (Frontend)**: https://urban-threads-u0on.onrender.com
- **API (Backend)**: https://urban-threads-api-8us1.onrender.com
- **Swagger Docs**: https://urban-threads-api-8us1.onrender.com/api-docs

> **Nota:** El plan gratuito de Render puede tardar ~30 segundos en responder la primera vez si el servidor esta inactivo (cold start).

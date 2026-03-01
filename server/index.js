require('dotenv').config();
// Evitar que el proceso se cierre por rechazos no capturados (p. ej. MongoDB)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err.message || err);
});

const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const { seedProducts, seedUsers } = require('./config/initialMock');

const app = express();

// Start HTTP server first so the app is reachable even if MongoDB is slow
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect DB and seed in background (no block if Atlas is slow/unreachable)
  connectDB()
    .then(async () => {
      await seedProducts();
      await seedUsers();
    })
    .catch((err) => console.error('MongoDB:', err.message));
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Urban Threads API',
      version: '1.0.0',
      description: 'E-commerce API for Urban Threads clothing store',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` }
    ],
    components: {
      securitySchemes: {
        authToken: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token',
          description: 'JWT authentication token'
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Stripe webhook needs raw body - must come BEFORE express.json()
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

// Middleware - CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175'
].filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    // Allow if in whitelist or if it's a Render domain
    if (allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/checkout'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Urban Threads API is running' });
});


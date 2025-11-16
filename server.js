require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Route imports
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'A complete e-commerce API with products and orders management',
      contact: {
        name: 'API Support',
        email: 'support@ecommerceapi.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API is running! 🚀',
    documentation: '/api-docs',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders'
    },
    database: 'MongoDB Connected to cse341_project2_ecommerce'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found: ' + req.originalUrl
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Dinku_byu:byu_md@cluster0.cnobyrn.mongodb.net/cse341_project2_ecommerce');
    console.log('✅ MongoDB Connected successfully to cse341_project2_ecommerce');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('🚀 Server started on port ' + PORT);
    console.log('📍 Local: http://localhost:' + PORT);
    console.log('📚 API Documentation: http://localhost:' + PORT + '/api-docs');
    console.log('🛍️  Products API: http://localhost:' + PORT + '/api/products');
    console.log('📦 Orders API: http://localhost:' + PORT + '/api/orders');
  });
};

startServer();

const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');

console.log('🚀 STARTING DATABASE SEEDING...');

// Sample data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 149.99,
    category: "Electronics",
    stock: 25
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for all terrains",
    price: 89.99,
    category: "Sports",
    stock: 40
  },
  {
    name: "Programming Book",
    description: "Complete guide to web development",
    price: 39.99,
    category: "Books",
    stock: 15
  }
];

const MONGODB_URI = 'mongodb+srv://Dinku_byu:byu_md@cluster0.cnobyrn.mongodb.net/cse341_project2_ecommerce';

const seedDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected!');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Data cleared');

    // Create products
    console.log('📦 Creating products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${products.length} products:`);
    products.forEach(p => console.log(`   - ${p.name} ($${p.price})`));

    // Get order count for order numbers
    const orderCount = await Order.countDocuments();
    console.log(`📊 Current order count: ${orderCount}`);

    // Create orders with manual order numbers
    console.log('📋 Creating orders...');
    
    // First order
    const order1 = new Order({
      orderNumber: `ORD${String(orderCount + 1).padStart(6, '0')}`,
      customer: {
        name: "John Doe",
        email: "john@example.com"
      },
      products: [
        {
          product: products[0]._id,
          quantity: 2,
          price: products[0].price
        }
      ],
      totalAmount: products[0].price * 2,
      shippingAddress: {
        street: "123 Main St",
        city: "Provo",
        state: "UT",
        zipCode: "84601",
        country: "USA"
      },
      status: "confirmed"
    });
    
    await order1.save();
    console.log('✅ Order 1 created successfully');

    // Second order
    const order2 = new Order({
      orderNumber: `ORD${String(orderCount + 2).padStart(6, '0')}`,
      customer: {
        name: "Jane Smith", 
        email: "jane@example.com"
      },
      products: [
        {
          product: products[1]._id,
          quantity: 1,
          price: products[1].price
        }
      ],
      totalAmount: products[1].price,
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Orem", 
        state: "UT",
        zipCode: "84057",
        country: "USA"
      },
      status: "pending"
    });
    
    await order2.save();
    console.log('✅ Order 2 created successfully');

    console.log('🎉 SEEDING COMPLETED!');
    console.log('📊 Database ready for demonstration');
    console.log('');
    console.log('🌐 Test your API:');
    console.log('   Products: https://ecommerce-api-8ewr.onrender.com/api/products');
    console.log('   Orders: https://ecommerce-api-8ewr.onrender.com/api/orders');
    
    // Close connection
    await mongoose.connection.close();
    console.log('📡 Connection closed');
    
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error.message);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();

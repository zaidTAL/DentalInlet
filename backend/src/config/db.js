const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV;
    let mongo_uri;
    
    if (env === 'production') {
      mongo_uri = process.env.MONGO_PROD_URI;
    } else {
      mongo_uri = process.env.MONGO_URI;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('Environment:', env);
    console.log('URI (first 80 chars):', mongo_uri?.substring(0, 80) + '...');

    const conn = await mongoose.connect(mongo_uri, {
      // ✅ Connection timeout settings
      serverSelectionTimeoutMS: 20000,   // 20 seconds (increased from 15)
      socketTimeoutMS: 60000,           // 60 seconds (increased from 45)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Error Code:', error.code);
    // Throw error so app.js knows it failed
    throw error;
  }
};

module.exports = connectDB;

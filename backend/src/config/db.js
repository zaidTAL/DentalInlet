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
    console.log('URI (first 80 chars):', mongo_uri?.substring(0, 80) + '...');

    const conn = await mongoose.connect(mongo_uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Stack:', error.stack);
    
    // Don't exit immediately - let server start anyway
    // process.exit(1);
  }
};

module.exports = connectDB;

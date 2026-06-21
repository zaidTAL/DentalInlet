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

    console.log('Connecting to:', mongo_uri?.substring(0, 80) + '...');

    const conn = await mongoose.connect(mongo_uri, {
      serverSelectionTimeoutMS: 15000,  // 15 seconds
      socketTimeoutMS: 60000,            // 60 seconds
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: 'majority',
      bufferCommands: true,
      bufferTimeoutMS: 30000,            // 30 seconds
      family: 4,                         // IPv4 only (fixes some network issues)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;  // ✅ Throw error so app.js knows it failed
  }
};

module.exports = connectDB;

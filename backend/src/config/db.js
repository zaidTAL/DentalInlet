const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV;
    let mongo_uri;

    if (env === 'production') {
      mongo_uri = process.env.MONGO_PROD_URI;
    } else if (env === 'development') {
      mongo_uri = process.env.MONGO_URI;
    } else {
      mongo_uri = process.env.MONGO_URI;
    }

    const conn = await mongoose.connect(mongo_uri);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;

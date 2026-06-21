const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const ipBlocker = require('./middleware/ipBlocker');
const securityAudit = require('./middleware/securityAudit');

// Load env vars
dotenv.config();

const app = express();

// ✅ Trust proxy (MUST be first)
app.set('trust proxy', 1);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Set security headers
app.use(helmet());

// CORS
const corsOrigin = process.env.CORS_PROD_ORIGIN || 'https://dentalinlet.com';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// IP Blocking
app.use(ipBlocker);

// Security Audit
app.use(securityAudit);

// Mongo Sanitize
const mongoSanitize = (req, res, next) => {
  const sanitize = (obj) => {
    if (obj instanceof Object) {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      }
    }
  };
  sanitize(req.body);
  sanitize(req.params);
  next();
};
app.use(mongoSanitize);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req) => req.path === '/health' || req.path === '/'
});
app.use('/api/', limiter);

// Health check (before DB connection needed)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Dental Inlet API is running...');
});

// Mount routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/contact', require('./routes/contact'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ✅ START SERVER AFTER DB CONNECTION
const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`🔒 Trust proxy: ${app.get('trust proxy')}`);
      console.log(`🌐 CORS origin: ${corsOrigin}`);
    });

    process.on('unhandledRejection', (err, promise) => {
      console.log(`❌ Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

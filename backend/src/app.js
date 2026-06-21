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

console.log('CORS Origin:', process.env.CORS_PROD_ORIGIN);
console.log('Node Env:', process.env.NODE_ENV);

// Connect to database
connectDB();

const app = express();

// ✅ CRITICAL:Trust proxy (Must be FIRST before rate limiter)
app.set('trust proxy', 1);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Set security headers
app.use(helmet());

// ✅ CORS - Use actual origin from env
const corsOrigin = process.env.CORS_PROD_ORIGIN || 'https://dentalinlet.com';

app.use(cors({
  origin: corsOrigin,  // ✅ Use actual origin (not "*")
  credentials: true,   // ✅ Now this works
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// IP Blocking Middleware (Global)
app.use(ipBlocker);

// Security Audit (Global)
app.use(securityAudit);

// Custom Mongo Sanitize
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

// ✅ Rate limiting (Fixed for trust proxy)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,     // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,      // Disable `X-RateLimit-*` headers
  skip: (req) => {           // Skip health checks
    return req.path === '/health' || req.path === '/';
  }
});

app.use('/api/', limiter);

// ✅ Health check route (no auth needed)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    cors_origin: corsOrigin,
    client_ip: req.ip
  });
});

// Mount routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/contact', require('./routes/contact'));

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Dental Inlet API is running...');
});

// Error handler (Must be LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`🔒 Trust proxy: ${app.get('trust proxy')}`);
  console.log(`🌐 CORS origin: ${corsOrigin}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

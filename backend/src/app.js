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
console.log(process.env.CORS_ORIGIN)

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
const corsOrigin = process.env.CORS_ORIGIN || process.env.CORS_PROD_ORIGIN;  
app.use(cors({
  origin: corsOrigin,
  credentials: true
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

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use('/api/', limiter);

// Mount routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/contact', require('./routes/contact'));

app.get('/', (req, res) => {
  res.send('Dental Inlet API is running...');
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

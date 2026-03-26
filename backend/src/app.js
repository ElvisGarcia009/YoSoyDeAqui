const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const photosRouter = require('./routes/photos');

const app = express();

// Trust proxy (required when deployed behind Nginx/Railway/Heroku for correct req.ip)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS — only allow the configured frontend origin
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Global rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use('/api/photos', photosRouter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler (4 params required by Express)
app.use((err, _req, res, _next) => {
  console.error(err);

  // Handle multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'La imagen no puede superar 5 MB' });
  }
  // Handle multer file type error
  if (err.message && err.message.includes('Solo se permiten')) {
    return res.status(400).json({ error: err.message });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

module.exports = app;

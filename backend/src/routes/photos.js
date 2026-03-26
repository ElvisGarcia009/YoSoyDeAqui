const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const upload = require('../middleware/upload');
const { uploadPhoto, getRandomPhotos } = require('../controllers/photosController');

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiadas solicitudes. Espera 15 minutos e intenta de nuevo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/upload', uploadLimiter, upload.single('image'), uploadPhoto);
router.get('/random', getRandomPhotos);

module.exports = router;

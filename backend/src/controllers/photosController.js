const db = require('../db');
const { uploadToCloudinary } = require('../services/cloudinaryService');
const { validateCedula, hashCedula } = require('../services/cedulaService');

async function uploadPhoto(req, res, next) {
  try {
    // 1. Validate file was attached
    if (!req.file) {
      return res.status(400).json({ error: 'Se requiere una imagen' });
    }

    // 2. Validate cédula
    const { cedula } = req.body;
    const validation = validateCedula(cedula);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // 3. Hash cédula and check for duplicate
    const cedulaHash = hashCedula(cedula);
    const existing = await db.query(
      'SELECT id FROM users_photos WHERE cedula_hash = $1',
      [cedulaHash]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({
        error: 'Ya existe una foto registrada con esta cédula.',
      });
    }

    // 4. Upload image to Cloudinary
    const { url } = await uploadToCloudinary(req.file.buffer);

    // 5. Save to database
    const ip = req.ip || req.headers['x-forwarded-for'] || null;
    await db.query(
      'INSERT INTO users_photos (image_url, cedula_hash, ip_address) VALUES ($1, $2, $3)',
      [url, cedulaHash, ip]
    );

    return res.status(201).json({ success: true, imageUrl: url });
  } catch (err) {
    next(err);
  }
}

async function getRandomPhotos(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 9, 50);
    const result = await db.query(
      'SELECT image_url FROM users_photos ORDER BY RANDOM() LIMIT $1',
      [limit]
    );
    return res.json({ photos: result.rows.map((r) => r.image_url) });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadPhoto, getRandomPhotos };

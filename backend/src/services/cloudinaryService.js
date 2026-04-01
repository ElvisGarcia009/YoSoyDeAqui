const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a Buffer to Cloudinary via upload_stream.
 * Multer stores the file in memory (buffer), so we pipe it through a stream.
 * Returns { url, publicId }.
 */
function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'yosoydeaqui',
        resource_type: 'image',
        transformation: [
          { width: 1600, height: 1600, crop: 'limit' },
          { quality: 90, fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

module.exports = { uploadToCloudinary };

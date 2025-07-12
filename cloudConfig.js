const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // Load .env

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET
});

// Configure storage for multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'WanderLust_Dev', // You can change folder name
    allowed_formats: ['jpeg', 'png', 'jpg']
  }
});

module.exports = {
  cloudinary,
  storage
};
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Sign = require('../models/Sign');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Helper function to upload to Cloudinary
const uploadToCloudinary = (file, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: resourceType,
        folder: 'sign-language'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// Upload sign content
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { keyword, description } = req.body;
    const imageFile = req.files['image'][0];
    const videoFile = req.files['video'][0];

    // Validate file sizes
    if (imageFile.size > 1 * 1024 * 1024) {
      return res.status(400).json({ 
        message: 'Image size must be less than 1MB' 
      });
    }

    if (videoFile.size > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        message: 'Video size must be less than 10MB' 
      });
    }

    // Upload image to Cloudinary
    const imageResult = await uploadToCloudinary(imageFile, 'image');
    
    // Upload video to Cloudinary
    const videoResult = await uploadToCloudinary(videoFile, 'video');

    // Create new sign in database
    const newSign = new Sign({
      keyword,
      description,
      imageUrl: imageResult.secure_url,
      videoUrl: videoResult.secure_url,
      cloudinaryImageId: imageResult.public_id,
      cloudinaryVideoId: videoResult.public_id
    });

    await newSign.save();

    res.status(201).json({
      message: 'Sign uploaded successfully',
      sign: newSign
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Error uploading files',
      error: error.message 
    });
  }
});

// Get all signs
router.get('/', async (req, res) => {
  try {
    const signs = await Sign.find().sort({ createdAt: -1 });
    res.json(signs);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching signs',
      error: error.message 
    });
  }
});

module.exports = router;
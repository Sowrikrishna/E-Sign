const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Sign = require('../models/Sign');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// function for uploading the file to cloudinary
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

// To Check the keyword availability
router.get('/check-keyword/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const existingSign = await Sign.findOne({ 
      keyword: { $regex: new RegExp(`^${keyword}$`, 'i') } 
    });

    res.json({ 
      exists: !!existingSign,
      keyword: keyword.toLowerCase()
    });
    
  } catch (error) {
    console.error('Error checking keyword:', error);
    res.status(500).json({ error: 'Failed to check keyword availability' });
  }
});

// To get all signs from MongoDB 
router.get('/', async (req, res) => {
  try {
    const signs = await Sign.find({}).select('keyword description imageUrl videoUrl createdAt updatedAt');
    res.json(signs);
  } catch (error) {
    console.error('Error fetching signs:', error);
    res.status(500).json({ error: 'Failed to fetch signs' });
  }
});

// this is for Upload sign content
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { keyword, description } = req.body;
    const imageFile = req.files['image'][0];
    const videoFile = req.files['video'][0];

    // Validate the image size less than 1mb
    if (imageFile.size > 1 * 1024 * 1024) {
      return res.status(400).json({ 
        message: 'Image size must be less than 1MB' 
      });
    }
    //Validate the video size less than 10mb
    if (videoFile.size > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        message: 'Video size must be less than 10MB' 
      });
    }

    // To check if keyword already exists
    const existingSign = await Sign.findOne({ 
      keyword: { $regex: new RegExp(`^${keyword}$`, 'i') } 
    });

    if (existingSign) {
      return res.status(400).json({ 
        message: `Keyword "${keyword}" already exists. Please choose a different keyword.` 
      });
    }

    // Upload image to Cloudinary
    const imageResult = await uploadToCloudinary(imageFile, 'image');
    
    // Upload video to Cloudinary
    const videoResult = await uploadToCloudinary(videoFile, 'video');

    // Creating new sign in database
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

// for updating the particular signs with id
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Update request received for ID:', req.params.id);
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const { id } = req.params;
    const { keyword, description } = req.body;
    const files = req.files;

    // Find existing sign
    const existingSign = await Sign.findById(id);
    if (!existingSign) {
      return res.status(404).json({ error: 'Sign not found' });
    }

    let updateData = { 
      keyword: keyword || existingSign.keyword,
      description: description || existingSign.description
    };

    // Update image if provided
    if (files?.image) {
      try {
        console.log('Updating image...');
        
        // Delete old image from Cloudinary
        if (existingSign.cloudinaryImageId) {
          await cloudinary.uploader.destroy(existingSign.cloudinaryImageId);
        }
        
        // Upload new image using streamifier
        const imageResult = await uploadToCloudinary(files.image[0], 'image');
        
        updateData.imageUrl = imageResult.secure_url;
        updateData.cloudinaryImageId = imageResult.public_id;
        console.log('Image updated successfully');
      } catch (imageError) {
        console.error('Error updating image:', imageError);
        return res.status(500).json({ error: 'Failed to update image' });
      }
    }

    // Update video if provided
    if (files?.video) {
      try {
        console.log('Updating video...');
        
        // Delete old video from Cloudinary
        if (existingSign.cloudinaryVideoId) {
          await cloudinary.uploader.destroy(existingSign.cloudinaryVideoId, { 
            resource_type: 'video' 
          });
        }
        
        // Upload new video using streamifier
        const videoResult = await uploadToCloudinary(files.video[0], 'video');
        
        updateData.videoUrl = videoResult.secure_url;
        updateData.cloudinaryVideoId = videoResult.public_id;
        console.log('Video updated successfully');
      } catch (videoError) {
        console.error('Error updating video:', videoError);
        return res.status(500).json({ error: 'Failed to update video' });
      }
    }

    // Update in database
    const updatedSign = await Sign.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Sign updated successfully');
    res.json(updatedSign);

  } catch (error) {
    console.error('Update error details:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid sign ID' });
    }
    
    res.status(500).json({ 
      error: 'Internal server error during update',
      details: error.message 
    });
  }
});

// for delete the api is  /api/signs/:id - Delete sign
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sign = await Sign.findById(id);
    if (!sign) {
      return res.status(404).json({ error: 'Sign not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(sign.cloudinaryImageId);
    await cloudinary.uploader.destroy(sign.cloudinaryVideoId, { 
      resource_type: 'video' 
    });

    // Delete from database
    await Sign.findByIdAndDelete(id);

    res.json({ message: 'Sign deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete sign' });
  }
});

//to get the created time and date
router.get('/', async (req, res) => {
  try {
    
    const signs = await Sign.find({}).sort({ createdAt: -1 });
    
    res.json(signs);
  } catch (error) {
    console.error('Error fetching signs:', error);
    res.status(500).json({ error: 'Failed to fetch signs' });
  }
});

module.exports = router;
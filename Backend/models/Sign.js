const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  cloudinaryImageId: {
    type: String,
    required: true
  },
  cloudinaryVideoId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sign', signSchema);
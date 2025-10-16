import React, { useState } from 'react';
import axios from 'axios';

const AddSign = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    keyword: '',
    description: ''
  });
  
  // State for files and previews
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  
  // State for submission feedback
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle video file selection and preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  // Validate all fields are filled
  const validateForm = () => {
    return (
      formData.keyword.trim() !== '' &&
      formData.description.trim() !== '' &&
      imageFile &&
      videoFile
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('keyword', formData.keyword);
      submitData.append('description', formData.description);
      submitData.append('image', imageFile);
      submitData.append('video', videoFile);

      // Send data to backend
      const response = await axios.post('/api/upload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success handling
      setMessage({ type: 'success', text: 'Upload successful!' });
      
      // Reset form
      setFormData({ keyword: '', description: '' });
      setImageFile(null);
      setVideoFile(null);
      setImagePreview(null);
      setVideoPreview(null);
      
      // Clean up preview URLs
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);

    } catch (error) {
      // Error handling
      setMessage({ 
        type: 'error', 
        text: 'Upload failed. Please try again.' 
      });
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Upload Sign Language Content
          </h2>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-3 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Keyword Input */}
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Keyword *
              </label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={formData.keyword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="e.g., Server"
                required
              />
            </div>

            {/* Image Upload with Preview */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Sign Image *
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Video Upload with Preview */}
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                Sign Video *
              </label>
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {videoPreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Video Preview:</p>
                  <video 
                    src={videoPreview} 
                    controls 
                    className="max-w-full h-32 rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter a brief description of the sign..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Content'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSign;
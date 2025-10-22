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
  const [isChecking, setIsChecking] = useState(false);
  const [keywordAvailable, setKeywordAvailable] = useState(null);

  // File size limits
  const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset availability check when keyword changes
    if (name === 'keyword') {
      setKeywordAvailable(null);
    }
  };

  // Check if keyword already exists in database
  const checkKeywordAvailability = async () => {
    if (!formData.keyword.trim()) {
      setMessage({ type: 'error', text: 'Please enter a keyword first' });
      return;
    }

    setIsChecking(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.get(`http://localhost:5000/api/signs/check-keyword/${formData.keyword.toLowerCase()}`);
      
      if (response.data.exists) {
        setKeywordAvailable(false);
        setMessage({ 
          type: 'error', 
          text: `Keyword "${formData.keyword}" already exists in database. Please choose a different keyword.` 
        });
      } else {
        setKeywordAvailable(true);
        setMessage({ 
          type: 'success', 
          text: `Keyword "${formData.keyword}" is available!` 
        });
      }
    } catch (error) {
      console.error('Error checking keyword:', error);
      setMessage({ 
        type: 'error', 
        text: 'Error checking keyword availability. Please try again.' 
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Handle image file selection and preview with size validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setMessage({ type: 'error', text: 'Image size must be less than 1MB' });
        e.target.value = ''; // Clear the file input
        return;
      }
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setMessage({ type: '', text: '' }); // Clear any previous errors
    }
  };

  // Handle video file selection and preview with size validation
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_VIDEO_SIZE) {
        setMessage({ type: 'error', text: 'Video size must be less than 10MB' });
        e.target.value = ''; // Clear the file input
        return;
      }
      setVideoFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setMessage({ type: '', text: '' }); // Clear any previous errors
    }
  };

  // Validate all fields are filled
  const validateForm = () => {
    if (!formData.keyword.trim() || !formData.description.trim() || !imageFile || !videoFile) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return false;
    }
    
    // Check if keyword availability was checked and is available
    if (keywordAvailable === null) {
      setMessage({ type: 'error', text: 'Please check keyword availability first' });
      return false;
    }
    
    if (keywordAvailable === false) {
      setMessage({ type: 'error', text: 'Keyword already exists. Please choose a different keyword.' });
      return false;
    }
    
    // Check file sizes again before submission
    if (imageFile.size > MAX_IMAGE_SIZE) {
      setMessage({ type: 'error', text: 'Image size must be less than 1MB' });
      return false;
    }
    
    if (videoFile.size > MAX_VIDEO_SIZE) {
      setMessage({ type: 'error', text: 'Video size must be less than 10MB' });
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
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
      const response = await axios.post('http://localhost:5000/api/signs', submitData, {
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
      setKeywordAvailable(null);
      
      // Clear file inputs
      document.getElementById('image').value = '';
      document.getElementById('video').value = '';
      
      // Clean up preview URLs
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);

    } catch (error) {
      // Error handling
      const errorMessage = error.response?.data?.message || 'Upload failed. Please try again.';
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Upload Sign Language Content
          </h2>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 sm:mb-6 p-3 rounded-md text-sm sm:text-base ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : message.type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Keyword Input with Availability Check */}
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Keyword *
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                  type="text"
                  id="keyword"
                  name="keyword"
                  value={formData.keyword}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
                  placeholder="e.g., Server"
                  required
                />
                <button
                  type="button"
                  onClick={checkKeywordAvailability}
                  disabled={isChecking || !formData.keyword.trim()}
                  className={`px-4 py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isChecking || !formData.keyword.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  } transition duration-200 whitespace-nowrap`}
                >
                  {isChecking ? 'Checking...' : 'Check Avalability'}
                </button>
              </div>
              
              {/* Availability Status Indicator */}
              {keywordAvailable !== null && (
                <div className={`mt-2 text-xs sm:text-sm font-medium ${
                  keywordAvailable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {keywordAvailable ? (
                    <span>✓ Keyword is available</span>
                  ) : (
                    <span>✗ Keyword already exists</span>
                  )}
                </div>
              )}
            </div>

            {/* Image Upload with Preview */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Sign Image * (Max 1MB)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Image Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-w-xs mx-auto h-24 sm:h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Video Upload with Preview */}
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                Sign Video * (Max 10MB)
              </label>
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {videoPreview && (
                <div className="mt-3">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Video Preview:</p>
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full max-w-xs mx-auto h-24 sm:h-32 rounded-md border border-gray-200"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
                placeholder="Enter a brief description of the sign..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || keywordAvailable === false}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white ${
                isSubmitting || keywordAvailable === false
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } transition duration-200`}
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
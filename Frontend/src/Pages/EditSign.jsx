// components/EditSign.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSign = ({ sign, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    keyword: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // File size limits (same as your AddSign)
  const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    if (sign) {
      setFormData({
        keyword: sign.keyword,
        description: sign.description
      });
    }
  }, [sign]);

  // Clean up preview URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreview, videoPreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setMessage({ type: 'error', text: 'Image size must be less than 1MB' });
        e.target.value = '';
        return;
      }
      setImageFile(file);
      
      // Create preview for new image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setMessage({ type: '', text: '' });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_VIDEO_SIZE) {
        setMessage({ type: 'error', text: 'Video size must be less than 10MB' });
        e.target.value = '';
        return;
      }
      setVideoFile(file);
      
      // Create preview for new video
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('keyword', formData.keyword);
      submitData.append('description', formData.description);
      
      if (imageFile) submitData.append('image', imageFile);
      if (videoFile) submitData.append('video', videoFile);

      const response = await axios.put(
        `http://localhost:5000/api/signs/${sign._id}`,
        submitData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        }
      );

      setMessage({ type: 'success', text: 'Sign updated successfully!' });
      
      // Clean up preview URLs after successful update
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating sign:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update sign';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!sign) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Sign</h2>
      
      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Keyword */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keyword *
          </label>
          <input
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Media Updates */}
        <div className="space-y-8">
          {/* Image Update Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Image
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                  <img 
                    src={sign.imageUrl} 
                    alt="Current" 
                    className="w-full h-48 object-cover rounded border"
                  />
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Current Image
                  </p>
                </div>
              </div>

              {/* New Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Image (Max 1MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
                />
                {imagePreview && (
                  <div className="border border-green-300 rounded-md p-4 bg-green-50">
                    <img 
                      src={imagePreview} 
                      alt="New Preview" 
                      className="w-full h-48 object-cover rounded border"
                    />
                    <p className="text-sm text-green-600 text-center mt-2">
                      New Image Preview
                    </p>
                  </div>
                )}
                {!imagePreview && (
                  <div className="border border-gray-300 rounded-md p-8 bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">
                      No new image selected
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Choose a file to see preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video Update Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Video</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Video
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                  <video 
                    className="w-full h-48 object-cover rounded border"
                    controls
                  >
                    <source src={sign.videoUrl} type="video/mp4" />
                  </video>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Current Video
                  </p>
                </div>
              </div>

              {/* New Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Video (Max 10MB)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
                />
                {videoPreview && (
                  <div className="border border-green-300 rounded-md p-4 bg-green-50">
                    <video 
                      className="w-full h-48 object-cover rounded border"
                      controls
                    >
                      <source src={videoPreview} type="video/mp4" />
                    </video>
                    <p className="text-sm text-green-600 text-center mt-2">
                      New Video Preview
                    </p>
                  </div>
                )}
                {!videoPreview && (
                  <div className="border border-gray-300 rounded-md p-8 bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">
                      No new video selected
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Choose a file to see preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Updating...' : 'Update Sign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSign;
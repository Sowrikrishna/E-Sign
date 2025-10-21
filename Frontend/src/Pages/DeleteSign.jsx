// components/DeleteSign.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteSign = ({ sign, onDelete, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleDelete = async () => {
    if (confirmText !== sign.keyword) {
      setMessage({ 
        type: 'error', 
        text: `Please type "${sign.keyword}" to confirm deletion.` 
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.delete(`http://localhost:5000/api/signs/${sign._id}`);
      onDelete(sign._id);
    } catch (error) {
      console.error('Error deleting sign:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete sign';
      setMessage({ type: 'error', text: errorMessage });
      setLoading(false);
    }
  };

  if (!sign) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Delete Sign</h2>
      
      {/* Warning Message */}
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <div className="text-red-600 mr-3 text-xl">⚠️</div>
          <p className="text-red-800">
            This action cannot be undone. This will permanently delete the sign, image, and video from both the database and Cloudinary.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {message.text && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 border border-red-200 rounded-md">
          {message.text}
        </div>
      )}

      {/* Sign Preview */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <img 
              src={sign.imageUrl} 
              alt={sign.keyword}
              className="w-24 h-24 object-cover rounded border"
            />
            <span className="text-xs text-gray-500 mt-1">Image</span>
          </div>
          <div className="flex flex-col items-center">
            <video 
              className="w-24 h-24 object-cover rounded border"
              muted
            >
              <source src={sign.videoUrl} type="video/mp4" />
            </video>
            <span className="text-xs text-gray-500 mt-1">Video</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg text-gray-900 capitalize">{sign.keyword}</h3>
          <p className="text-gray-600 mt-1">{sign.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(sign.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type <span className="font-mono text-red-600">"{sign.keyword}"</span> to confirm deletion:
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder={`Type "${sign.keyword}" to confirm`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading || confirmText !== sign.keyword}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Deleting...' : 'Delete Sign'}
        </button>
      </div>
    </div>
  );
};

export default DeleteSign;
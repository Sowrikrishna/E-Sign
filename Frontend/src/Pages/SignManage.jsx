// components/SignManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditSign from './EditSign';
import DeleteSign from './DeleteSign';

const SignManager = () => {
  const [signs, setSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all signs from MongoDB
  const loadSigns = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/signs');
      console.log(response.data);
      setSigns(response.data);
    } catch (error) {
      console.error('Error loading signs:', error);
      setError('Error loading signs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSigns();
  }, []);

  const handleEdit = (sign) => {
    setSelectedSign(sign);
    setView('edit');
  };

  const handleDelete = (sign) => {
    setSelectedSign(sign);
    setView('delete');
  };

  const handleUpdate = (updatedSign) => {
    setSigns(signs.map(sign => 
      sign._id === updatedSign._id ? updatedSign : sign
    ));
    setView('list');
    setSelectedSign(null);
  };

  const handleDeleteComplete = (deletedId) => {
    setSigns(signs.filter(sign => sign._id !== deletedId));
    setView('list');
    setSelectedSign(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedSign(null);
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Date error';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Technical Signs
          </h1>
          <p className="text-gray-600">
            Edit or delete existing sign language content
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
            {signs.length} signs in database
          </div>
        </div>

        {view === 'list' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Media
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signs.map((sign) => (
                    <tr key={sign._id} className="hover:bg-gray-50 transition-colors">
                      {/* Media - Medium Size */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <div className="flex flex-col items-center">
                            <img 
                              src={sign.imageUrl} 
                              alt={sign.keyword}
                              className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                            />
                            <span className="text-xs text-gray-500 mt-2">Image</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <video 
                              className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                              muted
                              preload="metadata"
                            >
                              <source src={sign.videoUrl} type="video/mp4" />
                            </video>
                            <span className="text-xs text-gray-500 mt-2">Video</span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Keyword */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 capitalize">
                          {sign.keyword}
                        </div>
                      </td>
                      
                      {/* Description */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-md">
                          {sign.description}
                        </div>
                      </td>
                      
                      {/* Created Date & Time */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {formatDateTime(sign.createdAt)}
                          </span>
                        </div>
                      </td>
                      
                      {/* Actions - Button Style with More Gap */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(sign)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(sign)}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              <div className="grid grid-cols-1 gap-6 p-6">
                {signs.map((sign) => (
                  <div key={sign._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex flex-col space-y-4">
                      {/* Header with Keyword and Actions */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {sign.keyword}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(sign)}
                            className="inline-flex items-center p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(sign)}
                            className="inline-flex items-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Media - Medium Size for Mobile */}
                      <div className="flex justify-center space-x-6">
                        <div className="flex flex-col items-center">
                          <img 
                            src={sign.imageUrl} 
                            alt={sign.keyword}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <span className="text-xs text-gray-500 mt-2">Image</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <video 
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                            muted
                            preload="metadata"
                          >
                            <source src={sign.videoUrl} type="video/mp4" />
                          </video>
                          <span className="text-xs text-gray-500 mt-2">Video</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {sign.description}
                        </p>
                      </div>

                      {/* Created Date & Time */}
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Created:</span> {formatDateTime(sign.createdAt)}
                        </p>
                      </div>

                      {/* Action Buttons for Mobile with More Gap */}
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={() => handleEdit(sign)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sign)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {signs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No signs found in the database.</p>
                <p className="text-gray-400 mt-1">Upload some signs to get started.</p>
              </div>
            )}
          </div>
        )}

        {/* Edit View */}
        {view === 'edit' && (
          <EditSign 
            sign={selectedSign} 
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}

        {/* Delete View */}
        {view === 'delete' && (
          <DeleteSign 
            sign={selectedSign}
            onDelete={handleDeleteComplete}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default SignManager;
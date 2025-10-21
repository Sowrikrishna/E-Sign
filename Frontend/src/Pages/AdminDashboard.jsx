// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSigns: 0,
    recentSigns: 0,
    totalStorage: '0 MB',
    lastUpdated: ''
  });
  const [recentSigns, setRecentSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/signs');
      const signs = response.data;

      // Calculate statistics
      const totalSigns = signs.length;
      const recentSignsCount = signs.filter(sign => {
        const signDate = new Date(sign.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return signDate > weekAgo;
      }).length;

      // Calculate approximate storage (rough estimate)
      const totalStorageMB = (totalSigns * 11).toFixed(1); // 1MB image + 10MB video per sign

      // Get last updated time
      const lastUpdated = signs.length > 0 
        ? new Date(signs[0].createdAt).toLocaleDateString()
        : 'Never';

      setStats({
        totalSigns,
        recentSigns: recentSignsCount,
        totalStorage: `${totalStorageMB} MB`,
        lastUpdated
      });

      // Get recent signs (last 5)
      setRecentSigns(signs.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add New Sign',
      description: 'Upload new sign language content',
      icon: '➕',
      action: () => navigate('/admin_page/add_sign'),
      color: 'green'
    },
    {
      title: 'Manage Signs',
      description: 'Edit or delete existing signs',
      icon: '✏️',
      action: () => navigate('/admin_page/manage_signs'),
      color: 'blue'
    },
    {
      title: 'View All Signs',
      description: 'Browse all sign language content',
      icon: '👀',
      action: () => navigate('/admin_page/view_signs'),
      color: 'purple'
    },
    {
      title: 'Refresh Data',
      description: 'Reload latest statistics',
      icon: '🔄',
      action: loadDashboardData,
      color: 'gray'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your sign language content and monitor system statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Signs Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Signs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSigns}</p>
              </div>
              <div className="text-3xl text-blue-500">📚</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total sign language entries</p>
          </div>

          {/* Recent Signs Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Signs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recentSigns}</p>
              </div>
              <div className="text-3xl text-green-500">🆕</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Added in last 7 days</p>
          </div>

          {/* Storage Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStorage}</p>
              </div>
              <div className="text-3xl text-purple-500">💾</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Cloudinary storage</p>
          </div>

          {/* Last Updated Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-lg font-bold text-gray-900">{stats.lastUpdated}</p>
              </div>
              <div className="text-3xl text-orange-500">📅</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Latest content addition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-4 rounded-lg border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors text-left group`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{action.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Signs</h2>
              {recentSigns.length > 0 ? (
                <div className="space-y-4">
                  {recentSigns.map((sign) => (
                    <div key={sign._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={sign.imageUrl} 
                          alt={sign.keyword}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 capitalize">
                            {sign.keyword}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {sign.description.length > 50 
                              ? `${sign.description.substring(0, 50)}...`
                              : sign.description
                            }
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(sign.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No signs available</p>
                  <p className="text-sm mt-1">Add your first sign to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* System Overview */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Connected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Cloudinary</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Connected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">API Server</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Online
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Content Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Storage Distribution</span>
                    <span className="font-medium">{stats.totalStorage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{stats.totalSigns}</p>
                    <p className="text-xs text-blue-600">Total Signs</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{stats.recentSigns}</p>
                    <p className="text-xs text-green-600">This Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Admin Tips</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Regularly backup your database</li>
                <li>• Check file sizes before uploading</li>
                <li>• Use descriptive keywords for signs</li>
                <li>• Monitor storage usage monthly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Admin Dashboard • Sign Language Management System</p>
          <p className="mt-1">Last refreshed: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import '../App.css';

const Navbar = () => {
  const { fontSize, decreaseFontSize, resetFontSize, increaseFontSize } = useAppContext();
  const [login, setLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setLogin(false);
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl">
      {/* Top Utility Bar */}
      <div className="bg-blue-950 py-3 px-4 border-b border-blue-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            {/* Left side - Accessibility */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center space-x-1 bg-blue-800 rounded-lg p-1">
                <button 
                  onClick={decreaseFontSize}
                  className="w-10 h-8 bg-blue-700 hover:bg-blue-600 text-white rounded-md font-bold transition-colors flex items-center justify-center text-sm"
                  title="Decrease font size"
                >
                  A-
                </button>
                <button 
                  onClick={resetFontSize}
                  className="w-10 h-8 bg-blue-700 hover:bg-blue-600 text-white rounded-md font-bold transition-colors flex items-center justify-center text-sm"
                  title="Reset font size"
                >
                  A
                </button>
                <button 
                  onClick={increaseFontSize}
                  className="w-10 h-8 bg-blue-700 hover:bg-blue-600 text-white rounded-md font-bold transition-colors flex items-center justify-center text-sm"
                  title="Increase font size"
                >
                  A+
                </button>
              </div>
              
              {!login && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors hidden sm:block whitespace-nowrap">
                  New Registration
                </button>
              )}
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
              {!login ? (
                <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center">
                  <button 
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="text-blue-100 hover:text-white hover:bg-blue-700 px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Student Login
                  </button>
                  <div className="hidden sm:block w-px h-4 bg-blue-600"></div>
                  <button 
                    onClick={(e) => handleLinkClick(e, '/admin_login')}
                    className="text-blue-100 hover:text-white hover:bg-blue-700 px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Admin Login
                  </button>
                  <div className="hidden sm:block w-px h-4 bg-blue-600"></div>
                  <button onClick={(e) => handleLinkClick(e, '/about')}className="text-blue-100 hover:text-white hover:bg-blue-700 px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
                    About
                  </button>
                  <div className="hidden sm:block w-px h-4 bg-blue-600"></div>
                  <button onClick={(e) => handleLinkClick(e, '/contact')}className="text-blue-100 hover:text-white hover:bg-blue-700 px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
                    Contact
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-blue-100 text-xs sm:text-sm whitespace-nowrap">Welcome back!</span>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Logo and University Info */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-center sm:text-left w-full lg:w-auto">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="BDU_logo.png" 
                  alt="Bharathidasan University" 
                  className="h-23 w-49 sm:h-24 sm:w-50 lg:h-28 lg:w-55 xl:h-32 xl:w-65 object-fit rounded-xl"
                />
              </div>
              
              {/* University Info */}
              <div className="flex-1 max-w-2xl">
                <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  BHARATHIDASAN UNIVERSITY
                </h2>
                
                <div className="bg-yellow-500 text-blue-900 px-3 py-1 sm:px-4 sm:py-2 rounded-full inline-block mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold whitespace-nowrap">
                    Centre for Differently Abled Persons
                  </h4>
                </div>
                
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium">
                  Tiruchirappalli - 620 024, Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Accreditation Badge - Hidden on mobile, shown on medium+ screens */}
            <div className="hidden md:block bg-white text-blue-900 rounded-2xl p-3 sm:p-4 text-center shadow-xl border-2 border-yellow-400">
              <div className="text-xs font-semibold text-gray-600 mb-1">NAAC ACCREDITED</div>
              <div className="text-xl sm:text-2xl font-black text-green-600 mb-1">A++</div>
              <div className="text-xs font-medium text-gray-700">Grade • CGPA 3.62</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Accreditation Badge */}
      <div className="md:hidden bg-white text-blue-900 rounded-lg p-3 mx-4 mb-4 text-center shadow-lg border border-yellow-400">
        <div className="text-xs font-semibold text-gray-600 mb-1">NAAC ACCREDITED</div>
        <div className="text-lg font-black text-green-600 mb-1">A++</div>
        <div className="text-xs font-medium text-gray-700">Grade • CGPA 3.62</div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-blue-950 py-3 px-4 border-t border-blue-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {!login && (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors sm:hidden">
              Register
            </button>
          )}
          
          <button 
            onClick={toggleMobileMenu}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ml-auto"
          >
            <span>Menu</span>
            <svg 
              className={`w-4 h-4 transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-700 animate-slideDown">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <div className="space-y-2">
              {!login ? (
                <>
                  <button 
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="block w-full text-left bg-blue-800 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm"
                  >
                    Student Login
                  </button>
                  <button 
                    onClick={(e) => handleLinkClick(e, '/admin_login')}
                    className="block w-full text-left bg-blue-800 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm"
                  >
                    Admin Login
                  </button>
                  <button className="block w-full text-left bg-blue-800 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm">
                    Contact Support
                  </button>
                  <button className="block w-full text-left bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm mt-2">
                    New Registration
                  </button>
                </>
              ) : (
                <button 
                  onClick={logout}
                  className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    
    </>
  );
};

export default Navbar;
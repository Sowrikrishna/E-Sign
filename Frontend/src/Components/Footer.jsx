import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#003366] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
          
          {/* Left Section - University Info */}
          <div className="text-center lg:text-left space-y-3">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-semibold text-yellow-400">Established 1982</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-xl font-bold text-white">Bharathidasan University</p>
              <p className="text-blue-100">Tiruchirappalli - 620 024</p>
              <p className="text-blue-100">Tamil Nadu, India</p>
            </div>

            {/* Contact Info - Mobile */}
            <div className="lg:hidden space-y-2 pt-4">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-blue-200">+91-431-240-XXXX</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-blue-200">cdap@bdu.ac.in</span>
              </div>
            </div>
          </div>

          {/* Right Section - Contact & Maintainer */}
          <div className="text-center lg:text-right space-y-4 hidden lg:block">
            <h3 className="text-lg font-semibold text-yellow-400">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-end space-x-2">
                <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-blue-200">+91-431-240-XXXX</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-blue-200">cdap@bdu.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-500 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-blue-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              2025 Bharathidasan University. All rights reserved.
            </span>
          </div>

          {/* Maintainer Info */}
          <div className="text-center md:text-right">
            <div className="text-blue-200 text-sm">
              Website Maintained by: <span className="font-semibold text-yellow-400">Centre for Differently Abled Persons, BDU</span>
            </div>
            <div className="text-blue-300 text-xs mt-1">
              Last updated: {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
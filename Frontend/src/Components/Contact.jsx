import React from 'react';
import { FaUserTie, FaPhone, FaMobile, FaEnvelope, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-6">
        
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            Contact Information
          </h1>
          <div className="w-40 h-1 bg-gradient-to-r from-[#003366] to-[#004080] mx-auto mb-6 -mt-2 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto ">
            Get in touch with our faculty member
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FaUserTie className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Dr. M. Prabavathy</h2>
                <p className="text-blue-200 text-lg">Associate Professor and Director i/c</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Designation and Address */}
              <div className="space-y-6">
                {/* Designation Card */}
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-[#003366]">
                  <h3 className="text-lg font-semibold text-[#003366] mb-3 flex items-center">
                    <FaUniversity className="mr-3 text-[#003366]" />
                    Current Position
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">Associate Professor and Director i/c</p>
                    <p className="text-sm">Grievance Redressal Officer for the Persons with Disabilities</p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#003366] mb-3 flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-[#003366]" />
                    Office Address
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">Bharathidasan University</p>
                    <p>Khajamalai Campus</p>
                    <p>Tiruchirappalli - 620 023</p>
                    <p>Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div className="space-y-6">
                {/* Telephone */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003366] mb-1">Telephone</h3>
                    <p className="text-gray-700 text-lg font-mono">+91 431 2420277</p>
                    <p className="text-gray-500 text-sm">Office Landline</p>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMobile className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003366] mb-1">Mobile</h3>
                    <p className="text-gray-700 text-lg font-mono">+91 72000 04044</p>
                    <p className="text-gray-500 text-sm">Direct Contact</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#003366] mb-1">E-Mail</h3>
                    <div className="space-y-1">
                    <button 
                        onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=cdapraba@bdu.ac.in', '_blank')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-mono break-all underline hover:no-underline transition-colors duration-200 text-left"
                    >
                        cdapraba@bdu.ac.in
                    </button><br />
                    <button 
                        onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=cdap@bdu.ac.in', '_blank')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-mono break-all underline hover:no-underline transition-colors duration-200 text-left"
                    >
                        cdap@bdu.ac.in
                    </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Click to open in Gmail</p>
                </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#003366] mb-2">Office Hours & Availability</h4>
                  <p className="text-gray-700">
                    For appointments and meetings, please contact via telephone or email during official working hours. 
                    The office is located at the Khajamalai Campus of Bharathidasan University.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Campus Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#003366] to-[#004080] rounded-lg flex items-center justify-center mr-4">
              <FaUniversity className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#003366]">Khajamalai Campus</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#003366] mb-3">Location Details</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Address:</strong> Khajamalai Campus, Bharathidasan University</p>
                <p><strong>City:</strong> Tiruchirappalli</p>
                <p><strong>PIN Code:</strong> 620 023</p>
                <p><strong>State:</strong> Tamil Nadu, India</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#003366] mb-3">About the Campus</h3>
              <p className="text-gray-700">
                The Khajamalai Campus houses specialized centers and departments of Bharathidasan University, 
                including the Centre for Differently Abled Persons. It is equipped with modern facilities 
                and accessible infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
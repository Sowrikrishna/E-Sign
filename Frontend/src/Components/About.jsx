import React from 'react';
import { FaBullseye, FaEye, FaRocket, FaUsers, FaGraduationCap, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#003366] to-[#004080] rounded-full mb-6 shadow-lg">
            <FaUsers className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            Centre for Differently Abled Persons
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003366] to-[#004080] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bharathidasan University • Established 2011
          </p>
        </div>

        {/* About the Centre Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-l-4 border-[#003366]">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#003366] to-[#004080] rounded-lg flex items-center justify-center mr-4">
              <FaRocket className="text-white text-xl" />
            </div>
            <h2 className="text-3xl font-bold text-[#003366]">About the Centre</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              The Centre for Differently Abled Persons has been established in Bharathidasan University 
              in the academic year 2011. The Centre has been established with the aim of providing 
              <span className="font-semibold text-[#003366]"> Training for Inclusive Education</span>.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-6">
              <h3 className="text-xl font-bold text-[#003366] mb-3 text-center">
                Our Motto: <span className="text-[#004080]">Encourage, Enable and Empower</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <FaGraduationCap className="text-[#003366] text-2xl mx-auto mb-2" />
                  <p className="font-semibold text-[#003366]">Education</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <FaLaptopCode className="text-[#003366] text-2xl mx-auto mb-2" />
                  <p className="font-semibold text-[#003366]">Employment</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <FaRocket className="text-[#003366] text-2xl mx-auto mb-2" />
                  <p className="font-semibold text-[#003366]">Entrepreneurship</p>
                </div>
              </div>
            </div>
            
            <p>
              The centre endeavors to empower persons with disabilities by providing training in 
              <span className="font-semibold text-[#003366]"> Information and Communication Technology</span>, 
              <span className="font-semibold text-[#003366]"> Assistive technology</span>, 
              <span className="font-semibold text-[#003366]"> vocational training</span>, 
              <span className="font-semibold text-[#003366]"> job placement</span>, and 
              <span className="font-semibold text-[#003366]"> entrepreneurship training</span> 
              with the ultimate objective of making differently abled persons self-reliant and economically independent.
            </p>
            
            <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <span className="font-semibold text-[#003366]">Unique Feature:</span> The Centre differs from routine academic Department, 
              as it is a specialized training cum production centre for Differently Abled and their stakeholders.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[#003366] to-[#004080] rounded-lg flex items-center justify-center mr-4">
              <FaBullseye className="text-white text-xl" />
            </div>
            <h2 className="text-3xl font-bold text-[#003366]">Our Objectives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#003366] mb-3">
                  {objective.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <FaEye className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <div className="space-y-4">
              <p className="text-blue-100 leading-relaxed text-lg">
                To ensure <span className="font-semibold text-white">full participation</span>, 
                <span className="font-semibold text-white"> total access</span>, 
                <span className="font-semibold text-white"> economic and social integration</span> of Differently Abled Persons.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#003366]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#003366] to-[#004080] rounded-lg flex items-center justify-center mr-4">
                <FaRocket className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">Our Mission</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed text-lg">
                To <span className="font-semibold text-[#003366]">augment the life</span> of Differently Abled Persons by assisting them to 
                <span className="font-semibold text-[#003366]"> identify and enrich their potentials and goals</span>.
              </p>
              <p className="leading-relaxed text-lg">
                To foster <span className="font-semibold text-[#003366]">self-development and self-reliance</span> of Differently Abled Persons through 
                <span className="font-semibold text-[#003366]"> ICT training and Employability skill</span>.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

// Objectives data
const objectives = [
  {
    title: "Resource Center Establishment",
    description: "To establish a Resource Training and Information Center for the Differently Abled Persons."
  },
  {
    title: "Innovative ICT Approaches",
    description: "To adopt innovative ICT based approaches for education, training, and rehabilitation of Persons with disabilities."
  },
  {
    title: "Skill Development",
    description: "To impart skill based training for the differently abled and sensitization programmes for the stakeholders."
  },
  {
    title: "Research & Education",
    description: "To promote teaching and research in disability studies with interdisciplinary perspectives."
  },
  {
    title: "Platform Creation",
    description: "To create a platform for the Differently Abled to express their needs and exhibit their potentials."
  }
];

export default About;
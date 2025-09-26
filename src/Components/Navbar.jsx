{/* import React, { useState } from 'react';
import './navbar.css';
import img1 from '../assets/Capture.PNG';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [user,setUser]=useState(false);
  const [login,setLogin]=useState(false);
  const navigate=useNavigate();

  const logout=()=>{
    setLogin(false);
  }
  return (
    <div className="navbar-container">
     
      <div className="navbar-top">
        <div className="navbar-left">
          
          {!login &&  <div>
            <i className="fas fa-user-plus"></i>
            <a href="#register">Register</a>
            </div>}
          <button className="font-btn">A-</button>
          <button className="font-btn">A</button>
          <button className="font-btn">A+</button>
        </div>

        <div className="navbar-right">
          {!login ?<div>
            <i className="fas fa-lock"></i>
            <a onClick={()=>navigate('/')}>User Login</a>
            | &nbsp;
            <i className="fas fa-user-cog"></i>
            <a onClick={()=>navigate('/admin_login')}>Admin Login</a>
            | &nbsp;
          </div>:<div>
            <i className="fas fa-user-cog"></i>
            <a href="admin-login" onClick={logout}>Logout</a>
            | &nbsp;
          </div>}
          
          <i className="fas fa-phone"></i>
          <a href="#contact">Contact</a>
        </div>
      </div>

      
      <div className="navbar-centerr">
        <img src={img1} alt="University Logo" className="logo" />
        <h1>Bharathidasan University</h1>
        <h2>Center for Differently Abled Person</h2>
        <p>Tiruchirappalli - 620 024, Tamil Nadu, India</p>
        <p>(Accredited with A+ Grade by NAAC in the Third Cycle</p>
        <p>& 36th Rank among the Indian Universities in NIRF–2024)</p>
      </div>
    </div>
  );
};

export default Navbar; */}

import React, { useState } from 'react';
import img1 from '../assets/Capture.PNG';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser ] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setLogin(false);
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="box-border bg-[#003366] text-white font-sans p-2.5">
      {/* Top Bar */}
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between flex-wrap">
        <div className="navbar-left flex items-center mt-1.25 md:mt-0 flex-wrap">
          {!login && (
            <div className="flex items-center">
              <i className="fas fa-user-plus mr-1.25 hover:underline hover:text-red-500"></i>
              <a href="#register" className="no-underline text-white ml-1 mr-3.75 text-sm hover:underline hover:text-red-500">Register</a>
            </div>
          )}
          <button className="font-btn bg-blue-600 text-white border-none px-2 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700">A-</button>
          <button className="font-btn bg-blue-600 text-white border-none px-2 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700">A</button>
          <button className="font-btn bg-blue-600 text-white border-none px-2 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700">A+</button>
        </div>

        <div className="navbar-right flex items-center mt-1.25 md:mt-0 flex-wrap">
          {!login ? (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <i className="fas fa-lock mr-1.25 hover:underline hover:text-red-500"></i>
                <a onClick={(e) => handleLinkClick(e, '/')} className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm hover:underline hover:text-red-500 cursor-pointer">User  Login</a>
              </div>
              <span>|</span>&nbsp;
              <div className="flex items-center">
                <i className="fas fa-user-cog mr-1.25 hover:underline hover:text-red-500"></i>
                <a onClick={(e) => handleLinkClick(e, '/admin_login')} className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm hover:underline hover:text-red-500 cursor-pointer">Admin Login</a>
              </div>
              <span>|</span>&nbsp;
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <i className="fas fa-user-cog mr-1.25 hover:underline hover:text-red-500"></i>
                <a onClick={logout} className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm hover:underline hover:text-red-500 cursor-pointer">Logout</a>
              </div>
              <span>|</span>&nbsp;
            </div>
          )}
          <div className="flex items-center">
            <i className="fas fa-phone mr-1.25 hover:underline hover:text-red-500"></i>
            <a href="#contact" className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm hover:underline hover:text-red-500">Contact</a>
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-centerr text-center mt-4">
        <img src={img1} alt="University Logo" className="logo h-12 md:h-15 mb-2.5 mx-auto block" />
        <h1 className="text-xl font-bold">Bharathidasan University</h1>
        <h2 className="text-base mt-1">Center for Differently Abled Person</h2>
        <p className="text-sm mt-0.5">Tiruchirappalli - 620 024, Tamil Nadu, India</p>
        <p className="text-sm mt-0.5">(Accredited with A+ Grade by NAAC in the Third Cycle</p>
        <p className="text-sm mt-0.5">& 36th Rank among the Indian Universities in NIRF–2024)</p>
      </div>
    </div>
  );
};

export default Navbar;

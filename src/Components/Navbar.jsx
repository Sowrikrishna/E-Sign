import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'
const Navbar = () => {
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState(true);
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
              <i className="fas fa-user-plus mr-1.25"></i>
              <a href="#register" className="no-underline text-white ml-1 mr-3.75 text-sm hover:underline hover:text-red-500">Register</a>
            </div>
          )}
          <button className="font-btn bg-blue-600 text-white border-none px-2 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700 mx-1 font-semibold">A-</button>
          <button className="font-btn bg-blue-600 text-white border-none px-2.5 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700 mx-1 font-semibold">A</button>
          <button className="font-btn bg-blue-600 text-white border-none px-2 py-1 ml-1 text-xs cursor-pointer rounded hover:bg-blue-700 mx-1 font-semibold">A+</button>
        </div>

        <div className="navbar-right flex items-center mt-1.25 md:mt-0 flex-wrap">
          {!login ? (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <i className="fas fa-lock mr-1.25"></i>
                <Link
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm cursor-pointer hover:text-red-500"
                >
                  User Login
                </Link>

              </div>
              <span>|</span>&nbsp;
              <div className="flex items-center">
                <i className="fas fa-user-cog mr-1.25"></i>
                <Link onClick={(e) => handleLinkClick(e, '/admin_login')} className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm  hover:underline hover:text-red-500 cursor-pointer">Admin Login</Link>
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
            <i className="fas fa-phone mr-1.25 "></i>
            <a className="no-underline text-white ml-1 mr-2.5 md:mr-3.75 text-sm hover:underline hover:text-red-500 cursor-pointer">Contact</a>
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-center text-center mt-4">
        
        <img src="BDU_logo.png" alt="University Logo" className="logo h-20 md:h-22 mb-2.5 mx-auto block" />
        <h1 className="text-xl font-bold">Bharathidasan University</h1>
        <h2 className="text-base mt-1">Center for Differently Abled Person</h2>
        <p className="text-xl font-bold mt-0.5 text-medium">Tiruchirappalli - 620 023, Tamil Nadu, India</p>
        
      </div>
    </div>
  );
};

export default Navbar;

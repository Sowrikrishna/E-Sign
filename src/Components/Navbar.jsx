import React, { useState } from 'react';
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
      {/* Top Bar */}
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

      {/* Center Section */}
      <div className="navbar-center">
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

export default Navbar;

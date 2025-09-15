import React from 'react';
import './navbar.css';
import img1 from '../assets/Capture.PNG';
const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* Top Bar */}
      <div className="navbar-top">
        <div className="navbar-left">
          <i className="fas fa-user-plus"></i>
          <a href="#register">Register</a>
          <button className="font-btn">A-</button>
          <button className="font-btn">A</button>
          <button className="font-btn">A+</button>
        </div>

        <div className="navbar-right">
          <i className="fas fa-lock"></i>
          <a href="#user-login">User Login</a>
          | &nbsp;
          <i className="fas fa-user-cog"></i>
          <a href="#admin-login">Admin Login</a>
          | &nbsp;
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

import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onClose }) => {
  const [captcha, setCaptcha] = useState("HJTYIU");
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  const handleSubmit = (e) => {
    if (!username) {
      alert("username is empty");
      return
    }
    if (!password) {
      alert("password is empty");
      return
    }
    if (!password && !username) {
      alert("username && password is empty");
      return
    }
    if (username === "sowri" && password === "123") {
      localStorage.setItem("validated", "validated")
      navigate('/admin_page');
    } else {
      alert("Enter correct admin username and password")
    }
  }

  return (

    <>
      {isOpen && (<div className="login-overlay">
        <div className="login-container">
          {/* Close button */}
          <button className="close-btn" onClick={() => { setIsOpen(false); navigate('/') }}>
            ✕
          </button>

          {/* Icon */}
          <div className="icon-container">
            <FaUser className="main-icon" />
            <div className="gear-icon">⚙️</div>
          </div>

          {/* Heading */}
          <h2 className="title">Admin Login</h2>

          {/* Username */}
          <div className="input-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input type="text" placeholder="User Name" onChange={(e) => { setusername(e.target.value) }} />
          </div>

          {/* Password */}
          <div className="input-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
          </div>

          {/* Captcha */}
          <input
            type="text"
            placeholder="Enter Captcha"
            className="captcha-input"
          />

          <div className="captcha-container">
            <span className="captcha-text">{captcha}</span>
            <span className="captcha-refresh" onClick={refreshCaptcha}>
              🔄
            </span>
          </div>

          {/* Forgot password */}
          <a href="#" className="forgot-link">
            Forgot Password
          </a>

          {/* Login button */}
          <button className="login-btn" onClick={handleSubmit}>Login</button>

          {/* Sign up */}
          <div className="signup-text">
            Don’t have an account? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default AdminLogin;

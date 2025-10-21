import React, { useState, useEffect } from "react";
import { FaUser , FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";


const AdminLogin = ({ onClose }) => {
  const {isUser,setIsUser}=useAppContext();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');


  // Clear fields on component mount (when modal opens)
  useEffect(() => {
    setusername('');
    setpassword('');
  }, []); // Empty dependency array: runs once on mount


  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Combined validation for username and password
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }
    
    
    if (username === "sowri" && password === "123") {
      setIsOpen(false);
      localStorage.setItem("Name",true);
      navigate('/admin_page');
      setIsUser(false);
      

    } else {
      alert("Enter correct admin username and password");
      setusername("");
      setpassword("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay fixed inset-0 w-screen h-screen bg-black/40 flex justify-center items-center z-[999] font-sans">
      <div className="login-container bg-white p-5 rounded-xl w-[350px] w-full max-w-sm mx-auto shadow-xl z-[1000] relative">
        {/* Close button */}
        <button 
          type="button"
          className="close-btn absolute top-2.5 right-2.5 bg-red-500 text-white border-none rounded-full w-6 h-6 text-base cursor-pointer flex items-center justify-center leading-none hover:bg-red-600"
          onClick={() => { 
            setIsOpen(false); 
            navigate('/'); 
          }}
        >
          ✕
        </button>

        {/* Icon */}
        <div className="icon-container text-center mb-2 relative">
          <FaUser  className="main-icon text-5xl text-[#003366] mx-auto" />
          <div className="gear-icon w-5 h-5 bg-[#003366] rounded-full inline-block -ml-4 text-white text-sm leading-5 text-center absolute -bottom-2 right-1/2 transform translate-x-1/2">⚙️</div>
        </div>

        {/* Heading */}
        <h2 className="title text-center mb-3 text-lg font-semibold text-gray-800">Admin Login</h2>

        {/* Username */}
        <div className="input-group flex mb-4">
          <div className="input-icon bg-[#003366] p-3 flex items-center text-white">
            <FaUser  className="text-sm" />
          </div>
          <input 
            type="text" 
            placeholder="User  Name" 
            value={username}
            onChange={(e) => { setusername(e.target.value) }} 
            autoComplete="off"  // Prevents browser autofill
            className="flex-1 p-2.5 border border-gray-300 outline-none focus:border-blue-500 focus:outline-none -ml-2"
          />
        </div>

        {/* Password */}
        <div className="input-group flex mb-4">
          <div className="input-icon bg-[#003366] p-3 flex items-center text-white">
            <FaLock className="text-sm" />
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => { setpassword(e.target.value) }} 
            autoComplete="new-password"  // Prevents autofill and saving as credential
            className="flex-1 p-2.5 border border-gray-300 outline-none focus:border-blue-500 focus:outline-none"
          />
        </div>

        

        {/* Forgot password */}
        <a className="forgot-link text-blue-600 text-sm underline block mb-4 hover:text-blue-800">
          Forgot Password
        </a>

        {/* Login button */}
        <button 
          type="button"
          className="login-btn w-full bg-[#003366] text-white p-3 border-none cursor-pointer text-base hover:bg-[#002244] rounded-full"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Sign up */}
        <div className="signup-text text-center mt-4 text-sm text-gray-600">
          Don’t have an account? <a href="#" className="text-blue-600 underline hover:text-blue-800">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
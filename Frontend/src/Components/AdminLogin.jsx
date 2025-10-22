// import React, { useState, useEffect } from "react";
// import { FaUser , FaLock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../Context/AppContext";


// const AdminLogin = ({ onClose }) => {
//   const {isUser,setIsUser}=useAppContext();
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();
//   const [username, setusername] = useState('');
//   const [password, setpassword] = useState('');


//   // Clear fields on component mount (when modal opens)
//   useEffect(() => {
//     setusername('');
//     setpassword('');
//   }, []); // Empty dependency array: runs once on mount


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Combined validation for username and password
//     if (!username || !password) {
//       alert("Username and password cannot be empty");
//       return;
//     }
    
    
//     if (username === "sowri" && password === "123") {
//       setIsOpen(false);
//       localStorage.setItem("Name",true);
//       navigate('/admin_page');
//       setIsUser(false);
      

//     } else {
//       alert("Enter correct admin username and password");
//       setusername("");
//       setpassword("");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="login-overlay fixed inset-0 w-screen h-screen bg-black/40 flex justify-center items-center z-[999] font-sans">
//       <div className="login-container bg-white p-5 rounded-xl w-[350px] w-full max-w-sm mx-auto shadow-xl z-[1000] relative">
//         {/* Close button */}
//         <button 
//           type="button"
//           className="close-btn absolute top-2.5 right-2.5 bg-red-500 text-white border-none rounded-full w-6 h-6 text-base cursor-pointer flex items-center justify-center leading-none hover:bg-red-600"
//           onClick={() => { 
//             setIsOpen(false); 
//             navigate('/'); 
//           }}
//         >
//           ✕
//         </button>

//         {/* Icon */}
//         <div className="icon-container text-center mb-2 relative">
//           <FaUser  className="main-icon text-5xl text-[#003366] mx-auto" />
//           <div className="gear-icon w-5 h-5 bg-[#003366] rounded-full inline-block -ml-4 text-white text-sm leading-5 text-center absolute -bottom-2 right-1/2 transform translate-x-1/2">⚙️</div>
//         </div>

//         {/* Heading */}
//         <h2 className="title text-center mb-3 text-lg font-semibold text-gray-800">Admin Login</h2>

//         {/* Username */}
//         <div className="input-group flex mb-4">
//           <div className="input-icon bg-[#003366] p-3 flex items-center text-white">
//             <FaUser  className="text-sm" />
//           </div>
//           <input 
//             type="text" 
//             placeholder="User  Name" 
//             value={username}
//             onChange={(e) => { setusername(e.target.value) }} 
//             autoComplete="off"  // Prevents browser autofill
//             className="flex-1 p-2.5 border border-gray-300 outline-none focus:border-blue-500 focus:outline-none -ml-2"
//           />
//         </div>

//         {/* Password */}
//         <div className="input-group flex mb-4">
//           <div className="input-icon bg-[#003366] p-3 flex items-center text-white">
//             <FaLock className="text-sm" />
//           </div>
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => { setpassword(e.target.value) }} 
//             autoComplete="new-password"  // Prevents autofill and saving as credential
//             className="flex-1 p-2.5 border border-gray-300 outline-none focus:border-blue-500 focus:outline-none"
//           />
//         </div>

        

//         {/* Forgot password */}
//         <a className="forgot-link text-blue-600 text-sm underline block mb-4 hover:text-blue-800">
//           Forgot Password
//         </a>

//         {/* Login button */}
//         <button 
//           type="button"
//           className="login-btn w-full bg-[#003366] text-white p-3 border-none cursor-pointer text-base hover:bg-[#002244] rounded-full"
//           onClick={handleSubmit}
//         >
//           Login
//         </button>

//         {/* Sign up */}
//         <div className="signup-text text-center mt-4 text-sm text-gray-600">
//           Don’t have an account? <a href="#" className="text-blue-600 underline hover:text-blue-800">Sign Up</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

const AdminLogin = ({ onClose }) => {
  const { isUser, setIsUser , isAdmin, setIsAdmin} = useAppContext();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear fields on component mount
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear previous messages
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError("Username and password cannot be empty");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (username === "sowri" && password === "123") {
        setSuccess("Login successful! Redirecting to admin panel...");
        setIsLoading(false);
        
        // Delay redirect to show success message
        setTimeout(() => {
          setIsOpen(false);
          setIsAdmin(true);
          navigate('/admin_page');
          setIsUser(false);
        }, 1500);
      } else {
        setError("Invalid username or password. Please try again.");
        setUsername("");
        setPassword("");
        setIsLoading(false);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/60 flex justify-center items-center z-[999] font-sans p-4">
      <div className="bg-white rounded-xl w-full max-w-sm mx-auto shadow-2xl z-[1000] relative overflow-hidden border border-gray-200">
        
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004080] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Login</h2>
              <p className="text-blue-200 text-xs">BDU Secure Access</p>
            </div>
          </div>
          
          {/* Close Button with Red Background */}
          <button 
            type="button"
            className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
            onClick={() => { 
              setIsOpen(false); 
              navigate('/'); 
            }}
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Compact Form Section */}
        <div className="p-5">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-pulse">
              <FaCheck className="text-green-500 text-sm flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <FaExclamationTriangle className="text-red-500 text-sm flex-shrink-0" />
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <FaUser className="mr-3 text-[#003366] text-lg -mb-3 " />
                
              </label>
              <label className="text-sm font-semibold text-gray-700 flex items-center">USERNAME</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(''); // Clear error when user starts typing
                }} 
                autoComplete="off"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all duration-200 bg-white text-sm"
                placeholder="Enter admin username"
                disabled={isLoading}
              />
            </div>

            {/* Password Field - Icon and text in same line */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <FaUser className="mr-3 text-[#003366] text-lg -mb-3 " />
                
              </label>
              <label className="text-sm font-semibold text-gray-700 flex items-center">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user starts typing
                }} 
                autoComplete="new-password"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all duration-200 bg-white text-sm"
                placeholder="Enter admin password"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#003366] to-[#004080] text-white p-3 rounded-lg font-semibold text-sm hover:from-[#002244] hover:to-[#003366] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                "ACCESS ADMIN PANEL"
              )}
            </button>
          </form>

          {/* Compact Security Notice */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <FaLock className="text-[#003366] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Restricted access for authorized personnel only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
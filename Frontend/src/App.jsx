import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AllRoutes from './Routes/AllRoutes';
import './App.css'
import { useAppContext } from './Context/AppContext';
function App() {
  const {isUser,setIsUser}=useAppContext();
  useEffect(()=>{
    if(localStorage.getItem("Name")=="true")
    {
      setIsUser(false);
    }
  },[]);
  return (
    <>
      <AllRoutes/>
    </>
  )
}

export default App

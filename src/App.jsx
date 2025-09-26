import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AllRoutes from './Routes/AllRoutes';
import './App.css'
function App() {
  

  return (
    <>
      <Navbar />
      <AllRoutes/>
      <Footer />
    </>
  )
}

export default App

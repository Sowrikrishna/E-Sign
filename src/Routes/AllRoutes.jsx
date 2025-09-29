import React from 'react'
import Search from '../Components/Search'
import AdminLogin from '../Components/AdminLogin'
import Home from '../Components/Home'
import {Routes,Route} from 'react-router-dom'
const AllRoutes = () => {
  const validate = localStorage.getItem("validated")
  console.log("shu", validate);
  
  return (
    <div>
      
      <Routes>
        
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>

      </Routes>
    </div>
  )
}

export default AllRoutes

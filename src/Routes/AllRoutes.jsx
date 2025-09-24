import React from 'react'
import Search from '../Components/Search'
import AdminLogin from '../Components/AdminLogin'

import {Routes,Route} from 'react-router-dom'
import Adminpage from '../Components/adminpage'
const AllRoutes = () => {
  const validate = localStorage.getItem("validated")
  console.log("shu", validate);
  
  return (
    <div>
      
      <Routes>
        
        <Route path='/' element={<Search></Search>}></Route>
        <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>
        {validate !== undefined && <Route path='/admin_page' element={<Adminpage/>}></Route>}

      </Routes>
    </div>
  )
}

export default AllRoutes

import React from 'react'
import Search from '../Components/Search'
import AdminLogin from '../Components/AdminLogin'

import {Routes,Route} from 'react-router-dom'
const AllRoutes = () => {
  return (
    <div>
      
      <Routes>
        
        <Route path='/' element={<Search></Search>}></Route>
        <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>
      </Routes>
    </div>
  )
}

export default AllRoutes

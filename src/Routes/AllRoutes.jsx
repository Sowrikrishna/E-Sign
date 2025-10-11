import React from 'react'
import Search from '../Components/Search'
import AdminLogin from '../Components/AdminLogin'
import Home from '../Components/Home'
import {Routes,Route, useLocation} from 'react-router-dom'
import AdminPage from '../Pages/AdminPage'
import Addsign from '../Components/Addsign'
import PageNotFound from '../Pages/PageNotFound'
import { useAppContext } from '../Context/AppContext'
const AllRoutes = () => {
  const isAdminPage=useLocation().pathname.includes("admin_page");
  const {isUser}=useAppContext();
  return (
    <div>
      
      <Routes>
        
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>
        
        {/*Admin Login */}
        
        <Route path='/admin_page' element={isUser? <PageNotFound/>: <AdminPage/>}>
            <Route index element={<AdminPage/>}></Route>
            <Route path='View_Sign' element={<Addsign/>}></Route>
        </Route>
        

      </Routes>
    </div>
  )
}

export default AllRoutes

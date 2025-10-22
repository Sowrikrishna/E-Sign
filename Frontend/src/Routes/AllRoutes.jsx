// import React from 'react'
// import Search from '../Components/Search'
// import AdminLogin from '../Components/AdminLogin'
// import Home from '../Components/Home'
// import {Routes,Route, useLocation} from 'react-router-dom'
// import AdminPage from '../Pages/AdminPage'
// import Addsign from '../Components/Addsign'
// import PageNotFound from '../Pages/PageNotFound'
// import { useAppContext } from '../Context/AppContext'
// import AddSign from '../Pages/AddSign'
// import ViewAllSigns from '../Pages/ViewAllSigns'
// import SignManage from '../Pages/SignManage'
// import AdminDashboard from '../Pages/AdminDashboard'

// const AllRoutes = () => {
//   const isAdminPage=useLocation().pathname.includes("admin_page");
//   const {isUser}=useAppContext();
  
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Home></Home>}></Route>
//         <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>
        
//         {/* Admin Routes with nested structure */}
//         <Route path='/admin_page' element={isUser ? <PageNotFound/> : <AdminPage/>}>
//           <Route index element={<AdminDashboard />} />
//           <Route path='add_sign' element={<AddSign/>} />
//           <Route path='view_signs' element={<ViewAllSigns/>} />
//           <Route path='manage_signs' element={<SignManage/>} />
//         </Route>

//         {/* If you want to keep the standalone /add_Sign route */}
//         {/* <Route path='/add_Sign' element={isUser ? <PageNotFound/> : <AddSign/>}></Route> */}

//       </Routes>
//     </div>
//   )
// }


// export default AllRoutes


import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'

// User Components
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import About from '../Components/About'
import Contact from '../Components/Contact'

// Admin Components
import AdminLogin from '../Components/AdminLogin'
import AdminPage from '../Pages/AdminPage'
import AdminDashboard from '../Pages/AdminDashboard'
import AddSign from '../Pages/AddSign'
import ViewAllSigns from '../Pages/ViewAllSigns'
import SignManage from '../Pages/SignManage'
import PageNotFound from '../Pages/PageNotFound'

const AllRoutes = () => {
  const { isAdmin } = useAppContext(); // Assuming you have isAdmin in context

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* ===== ADMIN LOGIN ===== */}
        <Route path="/admin_login" element={<AdminLogin />} />

        {/* ===== ADMIN ROUTES ===== */}
        {/* Protected admin routes - only accessible if admin is logged in */}
        {isAdmin ? (
          <Route path="/admin_page" element={<AdminPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add_sign" element={<AddSign />} />
            <Route path="view_signs" element={<ViewAllSigns />} />
            <Route path="manage_signs" element={<SignManage />} />
          </Route>
        ) : (
          // If not admin, redirect admin routes to login
          <Route path="/admin_page/*" element={<AdminLogin />} />
        )}

        {/* ===== 404 PAGE ===== */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

// Layout component for user pages
const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default AllRoutes
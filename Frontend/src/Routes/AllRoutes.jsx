import React from 'react'
import Search from '../Components/Search'
import AdminLogin from '../Components/AdminLogin'
import Home from '../Components/Home'
import {Routes,Route, useLocation} from 'react-router-dom'
import AdminPage from '../Pages/AdminPage'
import Addsign from '../Components/Addsign'
import PageNotFound from '../Pages/PageNotFound'
import { useAppContext } from '../Context/AppContext'
import AddSign from '../Pages/AddSign'
import ViewAllSigns from '../Pages/ViewAllSigns'

const AllRoutes = () => {
  const isAdminPage=useLocation().pathname.includes("admin_page");
  const {isUser}=useAppContext();
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/admin_login' element={<AdminLogin></AdminLogin>}></Route>
        
        {/* Admin Routes with nested structure */}
        <Route path='/admin_page' element={isUser ? <PageNotFound/> : <AdminPage/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='add_sign' element={<AddSign/>} />
          <Route path='view_signs' element={<ViewAllSigns/>} />
          <Route path='publications' element={<PublicationsPage />} />
          <Route path='projects' element={<ProjectsPage />} />
        </Route>

        {/* If you want to keep the standalone /add_Sign route */}
        <Route path='/add_Sign' element={isUser ? <PageNotFound/> : <AddSign/>}></Route>

      </Routes>
    </div>
  )
}

// Create these components or use placeholders
const AdminDashboard = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
    <p className="text-gray-600">Welcome to the admin panel. Use the navigation above to manage different sections.</p>
  </div>
);

const FacilitiesPage = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Facilities</h2>
    <p className="text-gray-600">Facilities management content goes here.</p>
  </div>
);

const PublicationsPage = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Publications</h2>
    <p className="text-gray-600">Publications management content goes here.</p>
  </div>
);

const ProjectsPage = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
    <p className="text-gray-600">Projects management content goes here.</p>
  </div>
);

export default AllRoutes
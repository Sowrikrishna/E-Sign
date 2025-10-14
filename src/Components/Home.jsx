import React from 'react'
import Search from './Search'
import Banner from './Banner'
import Navbar from './Navbar'
import Footer from './Footer'
export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Search></Search>
        <Footer/>
    </div>
  )
}
export default Home



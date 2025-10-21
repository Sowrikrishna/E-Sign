import React from 'react'
import Search from './Search'
import Banner from './Banner'
import Navbar from './Navbar'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'
export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Search></Search>
        <About/>
        <Contact/>
        <Footer/>
    </div>
  )
}
export default Home



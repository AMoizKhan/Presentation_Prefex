import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Banner from '../Banner'
import Services from '../Services'
import About from '../About'
import Testimonials from '../Testimonials'
import Footer from '../Footer'
import Work from '../Work'

const Home = () => {
const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  },[])
  return (
    <>
    <Navbar userDataProps={user} />
    <div className='bg-[#0b0c10] text-white'>

    <Banner />
    <Services/>
    <About/>
    <Work/>
    <Footer/>
    </div>
    </>
  )
}

export default Home
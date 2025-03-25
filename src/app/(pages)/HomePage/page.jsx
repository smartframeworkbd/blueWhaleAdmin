"use client"
import React from 'react'
import MarqueeN from '@/components/MarqueeN/MarqueeN'
import WelcomeSection from '@/components/WelcomeSection/WelcomeSection'
import { HomeNavbar } from '@/components/Navbar/HomeNavbar'
import Footer from '@/components/Footer/Footer'


const Home = () => {
  return (
    <div>
       
        <MarqueeN />   
        <HomeNavbar/>
        <div className="mx-auto max-w-[90%]">
        <WelcomeSection />
        </div>
      <Footer/>
    </div>
  )
}

export default Home

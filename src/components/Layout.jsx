import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout({handleSignOut}) {

  
  return (
    <div className="site-wrapper">
 <Header handleSignOut={handleSignOut}/>
    <main>
    <Outlet /> 
    </main>
    
    <Footer />
    </div>
    
    
  )
}

export default Layout
import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Outlet, Navigate} from "react-router-dom";

const MainLayout = () => {
  return (
   <>
  <div className='flex-col h-screen flex items-center justify-center'>
  <Header/>
   <div className='flex h-full bg-slate-200 w-full p-3 overflow-auto'>
    <Outlet/>
   </div>
    <Footer/>
  </div>
   </>
  )
}

export default MainLayout
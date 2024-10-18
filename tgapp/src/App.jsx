import React, { useEffect, useState } from 'react'
import { useTgContext } from './context/tgContext'
import MainLayout from './layouts/MainLayout'
import Category from './components/Category/Category';
import AppRoutes from './routes/routes';
import useTelegramData from "./api/useTelegramData";

const App = () => {
  const { telegramApp } = useTgContext()
  const [userData, setUserData] = useState(null)
  
  // useEffect(() => {
  //   //  telegramApp.ready()
  //     const uData = telegramApp.initData;
  //     // console.log(uData);
  //     setUserData(uData)
     
  // }, [])

  // useEffect(() => {
  //   if(userData) {
  //     checkData(userData);
  //   }

  // }, [userData])
  




  return (
    <>
      {/* <div>
        {userData && (
         <div>{userData}</div>
        )}
      </div> */}
      <AppRoutes/>
    </>
  )
}

export default App


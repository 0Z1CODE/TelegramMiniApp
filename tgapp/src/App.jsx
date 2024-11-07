import React, { useEffect, useState } from 'react'
import { useTgContext } from './context/tgContext'
import MainLayout from './layouts/MainLayout'
import Category from './components/Category/Category';
import AppRoutes from './routes/routes';
import useTelegramData from "./api/useTelegramData";

const App = () => {
  const { telegramApp } = useTgContext()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (telegramApp) {
      console.log("telegramApp", telegramApp.MainButton);
      
    }
  });
  return (
    <>

      <AppRoutes/>
    </>
  )
}

export default App


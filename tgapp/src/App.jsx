import React, { useEffect } from 'react'
import { useTgContext } from './context/tgContext'
import MainLayout from './layouts/MainLayout'
import Category from './components/Category/Category';
import AppRoutes from './routes/routes';

const App = () => {
const {telegramApp} = useTgContext()

  useEffect(() => {
    telegramApp.MainButton.text = "Оформити замовлення"
    telegramApp.MainButton.hide()
  }, [])


  return (
    <>
    <AppRoutes/>
    </>
  )
}

export default App
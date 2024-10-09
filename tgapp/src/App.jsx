import React, { useEffect } from 'react'
import { useTgContext } from './context/tgContext'
import MainLayout from './layouts/MainLayout'
import Category from './components/Category/Category';

const App = () => {
const {telegramApp} = useTgContext()

  useEffect(() => {
    telegramApp.MainButton.text = "юху кнопка"
    telegramApp.MainButton.hide()
  }, [])


  return (
    <>
  <MainLayout>
  <Category/>
  </MainLayout>
    </>
  )
}

export default App
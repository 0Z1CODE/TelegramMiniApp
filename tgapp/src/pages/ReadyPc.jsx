import React, { useEffect } from 'react'
import { useTgContext } from '../context/tgContext'
import { useNavigate } from 'react-router-dom'
import Products from '../components/Products/Products'


const ReadyPc = () => {
  const {telegramApp} = useTgContext()
  const navigate = useNavigate()
  useEffect(() => {
    telegramApp.BackButton.show()
    telegramApp.BackButton.onClick(() => (navigate('/')))
    return () => {
      telegramApp.BackButton.hide()
    }
  }, [])

  const products = [
    {
      id: 1,
      name: 'PC 1 Тут можна вказати назву товару',
      description: 'PC 1 тут можна вказати опис товару',
      image: 'https://via.placeholder.com/100',
      price: 1000
    },
    {
      id: 2,
      name: 'PC 2 Тут можна вказати назву товару',
      description: 'PC 2 тут можна вказати опис товару',
      image: 'https://via.placeholder.com/100',
      price: 2000
    }, 
    {
      id: 3,
      name: 'PC 3 Тут можна вказати назву товару',
      description: 'PC 3 тут можна вказати опис товару',
      image: 'https://via.placeholder.com/100',
      price: 3000
    }
  ]

  return (
      <Products products={products}/>
  )
}

export default ReadyPc
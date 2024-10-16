import React, { useEffect, useState, useCallback } from 'react'
import { useTgContext } from '../context/tgContext'
import { useNavigate } from 'react-router-dom'
import Products from '../components/Products/Products'
import image from '../assets/img/pc-image.webp';
import useProducts from '../api/useProducts';
import { ready_pc } from '../utils/const';
import useAppSettings from '../../zustand/useAppSettings';

const ReadyPc = () => {
  const { setPageTitle } = useAppSettings();
  const { getProductsByCategory } = useProducts()
  const [products, setProducts] = useState([])

  const fetchProducts = useCallback(async () => {
    await getProductsByCategory(ready_pc).then((data) => setProducts(data)).catch((error) => console.log(error))
  }, [useProducts])


  const { telegramApp } = useTgContext()
  // const navigate = useNavigate()

  useEffect(() => {
    setPageTitle('Готові ПК')
    fetchProducts()
    // telegramApp.BackButton.show()
    // telegramApp.BackButton.onClick(() => (navigate('/')))
    // return () => {
    //   telegramApp.BackButton.hide()
    // }
  }, [])



  return (
    <Products products={products} />
  )
}

export default ReadyPc
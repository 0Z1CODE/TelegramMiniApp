import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTgContext } from '../../context/tgContext'
import useProducts from '../../api/useProducts'
import ProductPCMarkdown from './ProductPCMarkdown'
import useAppSettings from '../../../zustand/useAppSettings'

const ReadyPcPage = () => {
  const { getProductById } = useProducts()
  const [product, setProduct] = useState(null)
  const { setPageTitle } = useAppSettings()

  const { product_code } = useParams()
  const navigate = useNavigate()
  const { telegramApp } = useTgContext()


  const fetchProduct = useCallback(async () => {
    await getProductById(product_code).then((data) => setProduct(data)).catch((error) => console.log(error))
  }, [useProducts])

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    setPageTitle(product?.title)
    telegramApp.MainButton.show();
    telegramApp.MainButton.onClick(() => navigate(`/quick-order/${product_code}`));
    telegramApp.MainButton.text = "Придбати зараз";
    return () => {
      telegramApp.MainButton.hide();
    }

  }, [product])


  return (
    <>
      <ProductPCMarkdown product={product} />
    </>
  )
}

export default ReadyPcPage
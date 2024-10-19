import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useTgContext } from '../../context/tgContext'
import { json, useNavigate, useParams } from 'react-router-dom'
import useProducts from '../../api/useProducts'
import useAppSettings from '../../../zustand/useAppSettings'
import { useForm } from "react-hook-form"
import useDelivery from '../../api/useDelivery'
import OrderMarkdown from './OrderMarkdown'


const QuickOrder = () => {
  // const { getAreas, getCitys} = useDelivery()
  const { getProductById, loading } = useProducts()
  const [deliveryData, setDeliveryData] = useState(null)
  const { setPageTitle } = useAppSettings()
  const [product, setProduct] = useState(null)
  // const { telegramApp } = useTgContext()
  const params = useParams()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const getProduct = useCallback(async () => {
    await getProductById(params.product_code).then((data) => setProduct(data)).catch((error) => console.log(error));
    return () => {
      setProduct(null);
    }
  }, [])

  useEffect(() => {
    getProduct()
    setPageTitle("Швидке замовлення")
    return () => {
      setProduct(null)
    }
  }, [])




  // useEffect(() => {
  //   if (watch("delivery") === "delivery") {
  //     telegramApp.MainButton.show();
  //     telegramApp.MainButton.setText("Надати своє місцезнаходження");
  //     telegramApp.MainButton.onClick(() => {
  //     telegramApp.sendData(JSON.stringify({ location: true, productTitle: product?.title }));
  //     });
  //     // telegramApp.MainButton.hide();
  //   }
  //   return () => {
  //     telegramApp.MainButton.hide()
  //   }


  // }, [watch("delivery")])


const onSubmit = (data) => console.log(data)

// const sendGeo = (cb) => {
//   telegramApp.showConfirm('Дякуємо за ваше замовлення' )
// }



  return (
    <>
      {/* <button onClick={sendGeo}>Send geo</button> */}
      <OrderMarkdown product={product} register={register} errors={errors} handleSubmit ={handleSubmit} onSubmit = {onSubmit}/>
    </>
  );
}

export default QuickOrder
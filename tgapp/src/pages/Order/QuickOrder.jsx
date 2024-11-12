import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useTgContext } from '../../context/tgContext'
import { json, useNavigate, useParams } from 'react-router-dom'
import useProducts from '../../api/useProducts'
import useAppSettings from '../../../zustand/useAppSettings'
import { useForm } from "react-hook-form"
import useDelivery from '../../api/useDelivery'
import OrderMarkdown from './OrderMarkdown'
import useOrder from '../../api/useOerder'
import useUserSettings from '../../../zustand/useUserSettings';
import useTelegramData from '../../api/useTelegramData'



const QuickOrder = () => {
  // const { getAreas, getCitys} = useDelivery()
  const { createOrder } = useOrder()
  const { getProductById, loading } = useProducts()
  const [deliveryData, setDeliveryData] = useState(null)
  const { setPageTitle } = useAppSettings()
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState(null)
  const { getLocation } = useTelegramData()
  const nav = useNavigate()
  const { currentUser } = useUserSettings()
  const params = useParams()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange", mode: "onChange", defaultValues: { first_name: currentUser?.first_name, last_name: currentUser?.last_name } });

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



  const onSubmit = (data) => {
    const orderData = {
      telegram_id: currentUser?.id,
      products: [
        {
          product_code: product?.product_code,
          quantity: 1,
        }
      ],
      delivery: data.delivery,
      payment: data.payment,
      oreder_owner: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
      },
      delivery_info: data.delivery_info,
    }
    createOrder(orderData)
      .then((data) => nav(`/order-cinfirm/${data.data.order_id}`))
      .catch((error) => console.log(error));
  }

  const getTelegramLocation = () => {
    setLoader(true);
    getLocation(currentUser?.id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));

  }

  return (
    <>
      <OrderMarkdown
        product={product}
        loader={loader}
        setLoader={setLoader}
        watch={watch}
        setValue={setValue}
        control={control}
        getTelegramLocation={getTelegramLocation}
        reset={reset} register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit} />
    </>
  );
}

export default QuickOrder
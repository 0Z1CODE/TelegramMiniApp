import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useOrder from '../../api/useOerder.js'
import { FaFileCircleCheck } from "react-icons/fa6";
import {useTgContext} from '../../context/tgContext'
import usePaymant from '../../api/usePaymant'
import useUserSettings from '../../../zustand/useUserSettings.js';

const OrderConfirmation = () => {
  const navigate = useNavigate()
  const { getOrderInfo } = useOrder()
  const [orderInfo, setOrderInfo] = useState(null)
  const { telegramApp } = useTgContext()
  const { createPaymant } = usePaymant()
  const { currentUser } = useUserSettings()


  const getOrder = useCallback(async () => {
    
    await getOrderInfo().then((data) => setOrderInfo(data)).catch((error) => console.log(error));
    return () => {
      setOrderInfo(null);
    }
  }, [getOrderInfo])

  useEffect(() => {
    getOrder()
    return () => {
      setOrderInfo(null)
    }
  }, [])



const sendOrder = async () => {
  const data = {
    for_mono: {
      amount: orderInfo?.total_price * 100,
      ccr: 980,
      redirectUrl: window.location.href,
      webHookUrl: "https://api.marokhonko.space/payments/hook",
    },
    order_id: orderInfo?.order_id,
    telegram_id: currentUser.id
  }
  createPaymant(data)
}

  useEffect(() => {
 if (orderInfo) {
  console.log(orderInfo?.payment);
  

   if (orderInfo?.payment === "cash") {
     telegramApp.MainButton.show()
     telegramApp.MainButton.text = "Завершити"
     telegramApp.MainButton.onClick(() => {})
   }
  if(orderInfo?.payment === "online") {
    telegramApp.MainButton.show()
    telegramApp.MainButton.text = "Сплатити"
    telegramApp.MainButton.onClick(sendOrder)
  }
 
  return () => {
    if (orderInfo.payment === "online") telegramApp.MainButton.offClick(sendOrder)
    if (orderInfo.payment === "cash") telegramApp.MainButton.offClick(() => {})
    telegramApp.MainButton.hide()
  }
 }
  
  }, [orderInfo]);


  return (
    <section className="card-body flex flex-col items-center justify-center ">
      <h1>ВАШЕ ЗАМОВЛЕННЯ СФОРМОВАНО</h1>
      <FaFileCircleCheck className="w-10 h-10 text-center text-accent" />
      <div>
        <h2>Інформація про замовлення:</h2>
        <p>Номер замовлення: <span className="text-accent"> {orderInfo?.order_id}</span></p>
        <p>Товар: <span className="text-accent"> {orderInfo?.products[0]?.product_name}</span></p>
        <p>Загальна сума: <span className="text-accent"> {orderInfo?.total_price.toFixed(2)}</span></p>
        <p>Отримувач<span className="text-accent"> {orderInfo?.oreder_owner?.first_name} {orderInfo?.oreder_owner?.last_name}</span></p>
        <p>Телефон<span className="text-accent"> {orderInfo?.oreder_owner?.phone}</span></p>
        <p>Доставка: <span className="text-accent"> {orderInfo?.delivery === "delivery" ? "Доставка" : "Самовивіз"}</span></p>
        <p>Оплата: <span className="text-accent"> {orderInfo?.payment === "cash" ? "Оплата при отриманні" : "Онлайн"}</span></p>
      </div>
{/* <button onClick={sendOrder}>Mono</button> */}
    </section>
  )
}

export default OrderConfirmation
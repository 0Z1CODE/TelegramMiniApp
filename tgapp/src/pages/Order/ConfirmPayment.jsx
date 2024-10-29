import React, { useEffect, useState } from 'react';
import { usePaumantHook } from '../../hooks/listenPaymentHook';
import useAppSettings from './../../../zustand/useAppSettings';



const ConfirmPayment = () => {
  const { setPageTitle } = useAppSettings();
  const { payment } = usePaumantHook();

  useEffect(() => {
    setPageTitle("Підтвердження платежу");
    return () => {
      setPageTitle("");
    };
  }, []);
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      {payment?.status !== "success" ? (
        <div>
          <h2>Ваш платіж успішно здійснено. Дякуємо за покупку.</h2>
          <div> Сума: {(payment?.amount)/100} </div>
          <div> Наш адміністратор скоро звяжеться з Вами </div>


        </div>
      ) : (
        <>
          <h1>Обробка платежу... {payment?.status}</h1>
          <span className="loading loading-bars text-accent loading-lg"></span>
        </>
      )}
    </div>
  );
};

export default ConfirmPayment;
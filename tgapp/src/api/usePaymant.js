/** @format */

import { useState, useEffect } from 'react';
import $api from './http';
import axios from 'axios';
import { useTgContext } from '../context/tgContext';
import { useNavigate } from 'react-router-dom';

const usePaymant = () => {
  const [loading, setLoading] = useState(false);
  const { telegramApp } = useTgContext();
  const navigate = useNavigate();

  const createPaymant = async (p_data) => {
    const api = process.env.MONOBANK_API;
    const token = process.env.MONOBANK_TOKEN;

    const paymentToDB = async (p_data) => {
      setLoading(true);
      try {
        const response = await $api.post('/payments', p_data);
        setLoading(false);
        return response;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const invoice = await axios
      .post(`${api}/api/merchant/invoice/create`, p_data?.monobank, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      })
      .then((data) => data)
      .catch((error) => console.log(error));


    if (invoice.data.invoiceId) {
      await paymentToDB({ ...p_data, ...invoice }).then((data) => {
        const payment = data.data;
        window.open(invoice.data.pageUrl, '_blank');
        console.log(`/confirm-payment/${payment._id}`);
        
        navigate(`/confirm-payment/${payment._id}`);
        
      });
    }
  };

  //  const checkPaymant = async () => {
  //       // const link = `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`;
  //     // if(invoiceId) {
  //     //   await axios.get(link, {
  //     //     headers: {
  //     //       'X-Token': token,
  //     //       'Content-Type': 'application/json'
  //     //     }
  //     //   }).then((data) => console.log(data)).catch((error) => console.log(error));
  //     // }
  // }

  return { createPaymant, loading };
};
export default usePaymant;

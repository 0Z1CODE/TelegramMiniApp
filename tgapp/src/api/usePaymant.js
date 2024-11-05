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

    const invoice = await axios
      .post(`${api}/api/merchant/invoice/create`, p_data?.for_mono, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const { data } = res;
        console.log("data", data);
        
        return $api.post('/payments', {
          ...p_data,
          pageUrl: data.pageUrl,
          invoiceId: data.invoiceId,
        });
      })
      .catch((error) => console.log(error));

    if (invoice.data.invoiceId) {
      console.log(111111);
      telegramApp.openLink(invoice.data.pageUrl);
      // window.open(invoice.data.pageUrl, '_blank');
      navigate(`/confirm-payment/${invoice.data.invoiceId}`);
    }
  };
  return { createPaymant, loading };
};
export default usePaymant;

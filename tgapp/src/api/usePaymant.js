import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";
import { useParams } from "react-router-dom";
import axios from "axios";




const usePaymant = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();


const createPaymant = async (p_data) => {
  const api = process.env.MONOBANK_API;
  const token = process.env.MONOBANK_TOKEN;

  const paymentToDB = async (p_data) => {
    setLoading(true);
    try {
      const response = await $api.post("/payments", p_data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const invoice = await axios.post(`${api}/api/merchant/invoice/create`, p_data?.monobank, {
    headers: {
      'X-Token': token,
      'Content-Type': 'application/json'
    }
  }
  ).then((data) => data)
  .catch((error) => console.log(error));
  

console.log({invoice});


  const invoiceId = invoice.data.invoiceId;
  const pageUrl = invoice.data.pageUrl;

  if (invoiceId) {
   await paymentToDB({...p_data, ...invoice}).then(
      (data) => console.log(data)
    ).catch((error) => console.log(error))
  }

  if (pageUrl) {
    window.location.href = pageUrl;
    telegramApp.MainButton.hide();
  }

}

  return { createPaymant, loading };
};
export default usePaymant;

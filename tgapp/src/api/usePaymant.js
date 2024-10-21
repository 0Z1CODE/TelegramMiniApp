import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";
import { useParams } from "react-router-dom";
import axios from "axios";




const usePaymant = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();


const createPaymant = async (data) => {
  const api = process.env.MONOBANK_API;
  const token = process.env.MONOBANK_TOKEN;
  console.log(api, token);
  // const {for_monobank} = data
  const invoice = await axios.post(`${api}/api/merchant/invoice/create`, data, {
    headers: {
      'X-Token': token,
      'Content-Type': 'application/json'
    }
  }
  ).then((data) => data).catch((error) => console.log(error));

  const invoiceId = invoice.data.invoiceId;
  const pageUrl = invoice.data.pageUrl;

  if (pageUrl) {
    window.location.href = pageUrl;
    telegramApp.MainButton.hide();
  }

}

  return { createPaymant, loading };
};
export default usePaymant;

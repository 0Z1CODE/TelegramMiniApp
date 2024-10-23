import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";
import axios from "axios";




const usePaymant = () => {
  const [loading, setLoading] = useState(false);


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
      'Content-Type': 'application/json',
    }
  }
  ).then((data) => data)
  .catch((error) => console.log(error));
  
  const invoiceId = invoice.data.invoiceId;
  const pageUrl = invoice.data.pageUrl;
  console.log(pageUrl);

  if (invoiceId) {
   await paymentToDB({...p_data, ...invoice}).then(
      (data) => console.log(data)
    ).catch((error) => console.log(error))
  }

  if (pageUrl) {
    const modifiedUrl = pageUrl.replace("https://pay.monobank.ua/", "https://pay.monobank.ua/embed/");
    console.log(modifiedUrl);

    // window.open(pageUrl, "_blank");
    window.location.href = (modifiedUrl+"?enablejsapi=1");
  
    
    telegramApp.MainButton.hide();
  }
}

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




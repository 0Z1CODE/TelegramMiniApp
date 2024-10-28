import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";
import { useParams } from "react-router-dom";




const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();


  const createOrder = async (data) => {
    try {
      setLoading(true);
      const response  = await $api.post("/order", {...data});
      setLoading(false);

      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  const getOrderInfo = async (order_id) => {
    try {
      setLoading(true);
      const response  = await $api.get(`/order/${params?.order_id}`);
      const data = response.data
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
    }
  };


  return { createOrder, getOrderInfo, loading };
};
export default useOrder;

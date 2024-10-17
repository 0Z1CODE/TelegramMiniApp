import { useState } from "react";
// import toast from "react-hot-toast";
import axios from "axios";

const url = "https://api.novaposhta.ua/v2.0/json/", token = process.env.NOVA_POST_API_KEY


const useDelivery = () => {
  const [loading, setLoading] = useState(false);
  
  const getAreas = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(url, {
        apiKey: token,
        modelName: "Address",
        calledMethod: "getAreas",
        methodProperties: {}
      });
      setLoading(false);

      return data.data;
    } catch (error) {
      setLoading(false);
    }

  }

  const getCitys = async (area) => {
    try {
      setLoading(true);
      const { data } = await axios.post(url, {
        apiKey: token,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: area
        }
      });
      setLoading(false);

      return data.data;
    } catch (error) {
      setLoading(false);
    }

  }

  return { getAreas, getCitys, loading };
};
export default useDelivery;

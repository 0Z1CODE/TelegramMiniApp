import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";




const useTelegramData = () => {
  const [loading, setLoading] = useState(false);

  const checkData = async (data) => {
    try {
      setLoading(true);
      const response  = await $api.post("/telegram/validate", {data});
      setLoading(false);

      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  const getLocation = async (chat_id) => {
    try {
      setLoading(true);
      const response  = await $api.post("/telegram/location", {chat_id});
      setLoading(false);

      return response;
    } catch (error) {
      setLoading(false);
    }
  }

  return { checkData, getLocation };
};
export default useTelegramData;

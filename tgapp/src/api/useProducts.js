import { useState } from "react";
// import toast from "react-hot-toast";
import $api from "./http";
// import useUserData from "../../zustand/useUserData";

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useUserData();

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await $api.get("/products");
      console.log(data);
      setLoading(false);

      return;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const { data } = await $api.get(`/products/category/${category}`);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
    }
  };

   const getProductById = async (id) => {
    try {
      setLoading(true);
      const { data } = await $api.get(`/products/${id}`);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
    }
  }

  return { getProducts, getProductsByCategory, getProductById, loading };
};
export default useProducts;

import React, { useReducer, useCallback, useEffect, useState } from "react";
import useProducts from "../../../api/useProducts";
import { useTgContext } from "../../../context/tgContext";
import axios from "axios";
import ProductPCMarkdown from "./ProductPCMarkdown";
import {useNavigate} from 'react-router-dom';

const ProductModal = ({ product_alias, product_name }) => {
  const { getProductById, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const { telegramApp } = useTgContext();
  const navigate = useNavigate();

  const [isModalOpen, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return true;
      case 'CLOSE_MODAL':
        return false;
      default:
        return state;
    }
  }, false);


  const tryMono = async () => {
    const api = process.env.MONOBANK_API;
    const token = process.env.MONOBANK_TOKEN;
    console.log(api, token);
    const data1 = {
      amount: 100,
      ccr: 980,
      redirectUrl: "https://marokhonko.space",
    }

    const invoice = await axios.post(`${api}/api/merchant/invoice/create`, data1, {
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

    console.log(invoiceId);


    // const link = `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`;
    // if(invoiceId) {
    //   await axios.get(link, {
    //     headers: {
    //       'X-Token': token,
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((data) => console.log(data)).catch((error) => console.log(error));
    // }

  }

  const fetchProduct = useCallback(async () => {
    await getProductById(product_alias).then((data) => setProduct(data)).catch((error) => console.log(error));
    return () => {
      setProduct(null);
    }
  }, []);


  useEffect(() => {
    if (isModalOpen) {
      fetchProduct();
      telegramApp.MainButton.show();
      telegramApp.MainButton.onClick(() => navigate(`/quick-order/${product_alias}`));
      telegramApp.MainButton.text = "Придбати зараз";

    }
    return () => {
      telegramApp.MainButton.hide();
      setProduct(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (product) {
      // prepearPCoptions(product?.info);
      // console.log(product.info);

    }
  }, [product]);

  return (
    <>
      <button
        className="bg-accent w-full text-white py-2 bg-opacity-65"
        onClick={() => (
          dispatch({ type: 'OPEN_MODAL' }),
          setTimeout(() => {
            document.getElementById(`mod-${product_alias}`).showModal()
          }, 100)
        )}
      >
        Детальніше
      </button>
      {isModalOpen && !loading ? (
        <dialog id={`mod-${product_alias}`} className="modal p-0 ">
          <ProductPCMarkdown product={product} dispatch={dispatch} />
        </dialog>
      ) : null}
    </>
  );
};

export default ProductModal;

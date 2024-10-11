import React, { useReducer } from "react";
import image from "../../assets/img/pc-image.webp";
import ProductCarousel from "../Products/ProductCarousel";
import { FaRegHeart } from "react-icons/fa";

const ProductModal = ({ product_alias, product_name }) => {
  const images = [image, image, image, image, image];
  return (
    <>
      <button
        className="bg-accent w-full text-white py-2 bg-opacity-65"
        onClick={() =>
          document.getElementById(`mod-${product_alias}`).showModal()
        }
      >
        Детальніше
      </button>
      <dialog id={`mod-${product_alias}`} className="modal p-0">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{product_name}</h3>
          <ProductCarousel images={images} />
          <div className="modal-action">
            <button className="btn btn-accent text-white">Придбати</button>
            <button className="btn btn-secondary text-white ">
              Додати в корзину
            </button>
            <button className="btn btn-base">
              {" "}
              <FaRegHeart className="text-orange-500" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProductModal;

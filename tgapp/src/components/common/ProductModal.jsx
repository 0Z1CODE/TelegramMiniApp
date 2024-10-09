import React, { useReducer } from "react";

const ProductModal = ({product_alias, product_name}) => {

  return (
    <>
      <button
        className="bg-info w-full rounded-b-md text-white py-2"
        onClick={() => document.getElementById(`mod-${product_alias}`).showModal()}
      >
        Детальніще
      </button>
      <dialog id={`mod-${product_alias}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{product_name}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default ProductModal;

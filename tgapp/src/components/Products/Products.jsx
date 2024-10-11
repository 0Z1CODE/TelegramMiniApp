import React from "react";
import { useTgContext } from "../../context/tgContext";
import ProductModal from "./../common/ProductModal";

const Products = ({ products }) => {
  // const {telegramApp} = useTgContext()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div className="border border-slate-600 border-opacity-10 ">
          <div
            key={product.id}
            className="bg-white bg-opacity-20  backdrop-blur-sm "
          >
            <img src={product.image} alt={product.name} className="size-full" />
            <div>
              <div className="p-2">
                <h3 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                  {product.name}
                </h3>
                <p className="font-light">{product.description}</p>

                <p>
                  Ціна: <span className="font-extrabold">{product.price}</span>₴
                </p>
              </div>
            </div>
          </div>
          <ProductModal
            product_alias={`id-${product.id}`}
            product_name={product.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Products;

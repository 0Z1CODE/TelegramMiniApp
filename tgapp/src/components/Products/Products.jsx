import React from "react";
import { RiDiscountPercentFill, RiPriceTag2Fill } from "react-icons/ri";
import LoaderCircle from "../common/Loader/LoaderCircle";
import { useNavigate } from "react-router-dom";


const Products = ({ products }) => {
  const navigate = useNavigate();
  return (
    <>
      {products ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div key={product.product_code} className="border border-slate-600 border-opacity-10 relative">
              <div
                className="bg-white bg-opacity-20  backdrop-blur-sm "
              >
                <div className="badge absolute bg-opacity-90 text-sky-500 bg-slate-800 top-0 right-0">{product.series}</div>
                {product.sale && <div className="absolute right-0 top-5"><RiDiscountPercentFill className="text-cyan-500 w-12 h-12" /></div>}
                <img src={product.images[0]} alt={product.name} className="size-full pt-2" />
                <div>
                  <div className="p-2">
                    <h3 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                      {product.title}
                    </h3>


                    <p className="font-light text-ellipsis whitespace-nowrap overflow-hidden">{product.description}</p>

                    {
                      <div className="flex text-ellipsis whitespace-nowrap overflow-hidden">
                        <p className="font-bold"> Ціна:  &nbsp; </p>
                        {
                          product.discount ? (
                            <p className="line-through">
                              <span className="font-extrabold">{product.price}</span>₴
                            </p>
                          )
                            : <p>
                              <span className="font-extrabold">{product.price}</span>₴
                            </p>
                        }
                        {product.discount && (
                          <p className="text-cyan-500 font-extrabold"> &nbsp; {product?.discount_price}₴</p>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
              <button
                className="bg-accent w-full text-white py-2 bg-opacity-65"
                onClick={() => (
                  navigate(`/ready-pc/${product.product_code}`)
                )}
              >
                Детальніше
              </button>

            </div>
          ))}
        </div>
      ) : (<LoaderCircle />)}
    </>
  );
};

export default Products;

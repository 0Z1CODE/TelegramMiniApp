import React, { useReducer, useCallback, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import useProducts from "../../api/useProducts";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import LoaderCircle from "./Loader/LoaderCircle";
import { IoClose } from "react-icons/io5";
import { pre } from "telegraf/format";

const ProductModal = ({ product_alias, product_name }) => {
  const { getProductById, loading } = useProducts();
  const [product, setProduct] = useState(null);

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

  const fetchProduct = useCallback(async () => {
    await getProductById(product_alias).then((data) => setProduct(data)).catch((error) => console.log(error));
    return () => {
      setProduct(null);
    }
  }, []);



  const equil = [
    {input: "processor", output:"Процесор", },
    {input: "cooler", output:"Охолодження процесора"},
    {input: "motherboard", output:"Материнська плата"},
    {input: "dram", output:"Оперативна пам'ять"},
    {input: "gpu", output:"Відеокарта"},
    {input: "ssd", output:"Накопичувач SSD"},
    {input: "hdd", output:"Накопичувач HDD"},
    {input: "pb", output:"Блок живлення"},
    {input: "case", output:"Корпус"},
    {input: "option_cooler", output:"Додаткове охолодження"},
    {input: "os", output:"Операційна система"},

  ]

  const info = [
    {
        "processor": "Ryzen 5 5500"
    },
    {
        "cooler": "AMD Wraith Stealth"
    },
    {
        "motherboard": "A520M K Gigabyte"
    },
    {
        "dram": "16Gb (2x8) DDR4 3200Mhz G.Skill Ripjaws V"
    },
    {
        "gpu": "GTX1650 4GB Inno3D Twin X2 OC V2"
    },
    {
        "ssd": "SSD 2.5 inch 480GB Patriot Burst Elite"
    },
    {
        "hdd": false
    },
    {
        "pb": "1stPlayer 500W (PS-500BS)"
    },
    {
        "case": "Gamemax Storm White"
    },
    {
        "option_cooler": "false"
    },
    {
        "os": "Тестова версія Windows"
    }
]

  const prepearPCoptions = (info) => {
    let options = []
    info.forEach((component) => {
      let key = Object.keys(component)[0];
      let value = Object.values(component)[0];
      let equilValue = equil.find((item) => item.input === key);
      if (value && value !== "false" ) {
        options.push({[equilValue.output]: value})
      }

    });

    return  options.map((option, index) => {
      return (
        <tr key={index}>
          <td>{Object.keys(option)[0]}</td>
          <td>{Object.values(option)[0]}</td>
        </tr>
      )
    })
  };
  

  useEffect(() => {
    if (isModalOpen) {
      fetchProduct();
      
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
        <dialog id={`mod-${product_alias}`} className="modal p-0">

          <div className="modal-box">

            <IoClose className="text-accent w-6 h-6 cursor-pointer  absolute right-2 top-2 " onClick={() => dispatch({ type: "CLOSE_MODAL" })} />

            <div className="mb-3 ">
              <Splide aria-label="My Favorite Images">
                {product?.images.map((image, index) => (
                  <SplideSlide key={index}>
                    <img src={image} alt="" className="w-full h-full object-cover rounded-md cursor-pointer" />
                  </SplideSlide>
                ))}

              </Splide>

            </div>
            <h3 className="text-accent font-semibold"> {product?.title}</h3>
            <p className="text-gray-900 font-thin"> {product?.description}</p>

            <div className="flex flex-col justify-between my-3">
              <h5>Комплектуючі: </h5>


              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}

                  <tbody>
                    {product &&  prepearPCoptions(product?.info)}
                  </tbody>
                </table>
              </div>


            </div>
            <div className="modal-action">
              <button className="btn btn-accent text-white">Придбати</button>
              <button className="btn btn-secondary text-white">
                Додати в корзину
              </button>
              <button className="btn btn-base">
                {" "}
                <FaRegHeart className="text-orange-500" />
              </button>
            </div>
          </div>



        </dialog>
      ) : null}
    </>
  );
};

export default ProductModal;

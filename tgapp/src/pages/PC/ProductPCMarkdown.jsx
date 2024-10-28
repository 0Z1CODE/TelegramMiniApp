import React from 'react'
import { IoClose } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { equilPC } from '../../utils/const'
import '@splidejs/react-splide/css';


const ProductPCMarkdown = ({product}) => {

  const prepearPCoptions = (info) => {
    let options = []
    info.forEach((component) => {
      let key = Object.keys(component)[0];
      let value = Object.values(component)[0];
      let equilValue = equilPC.find((item) => item.input === key);
      if (value && value !== "false") {
        options.push({ [equilValue.output]: value, icon: equilValue.icon });
      }
    });

    return options.map((option, index) => {
      return (
        <tr key={index}>
          <td><img src={Object.values(option)[1]} alt={Object.values(option)[0]} className="max-w-10" /></td>
          <td>{Object.keys(option)[0]}</td>
          <td className="text-accent">{Object.values(option)[0]}</td>
        </tr>
      )
    })
  };


  const perfomenceTest = (performance) => {
    let tests = []
    performance.forEach((test) => {
      let key = Object.keys(test)[0];
      let value = Object.values(test)[0];
      tests.push({ [key]: value });
    });

    return tests.map((test, index) => {
      return (
        <div key={index} className="mb-3 border-b ">
          <p>{Object.keys(test)[0]}:</p>
          <p className="text-info font-mono font-thin">{Object.values(test)[0]}</p>
          <progress className="progress progress-accent  h-3" value={
            Object.values(test)[0].split(" ")[Object.values(test)[0].split(" ").length - 2]
          } max="300"></progress>

        </div>
      )
    })
  }


  return (
    <>


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
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-normal px-0 text-accent">Комплектуючі:</div>
            <div className="collapse-content px-0">
              <table className="table">
                <tbody>
                  {product && prepearPCoptions(product?.info)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium px-0 text-accent" >Ігрові тести:</div>
            <div className="collapse-content px-0">
              {product && perfomenceTest(product?.performance)}
            </div>
          </div>

        </div>

        <div className='divider'></div>
        <div className="modal-action flex items-center">
          <p className="text-accent font-bold">Ціна: {product?.discount_price ? product?.discount_price : product?.price}₴</p>
          <button className="btn btn-secondary text-white">
            Додати в корзину
          </button>
          <button className="btn btn-base">
            {" "}
            <FaRegHeart className="text-orange-500" />
          </button>
        </div>
    </>
  )
}

export default ProductPCMarkdown
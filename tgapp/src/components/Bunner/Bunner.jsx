import React from 'react'
import bunner from './../../assets/img/bunner01.jpg'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const Bunner = () => {
  return (

    <div className="mb-3 ">
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img src={bunner} alt="bunner" className="w-full h-full object-cover rounded-md cursor-pointer" />
        </SplideSlide>
        <SplideSlide>
          <img src={bunner} alt="bunner" className="w-full h-full object-cover rounded-md cursor-pointer" />
        </SplideSlide>
      </Splide>
    </div>
  )
}

export default Bunner
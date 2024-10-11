import React from "react";

const ProductCarousel = ({ images }) => {
  return (
    <>
      <div className="carousel rounded-box h-72 ">
        {images.map((image, index) => (
          <div className="carousel-item h-full">
            <img src={image} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCarousel;

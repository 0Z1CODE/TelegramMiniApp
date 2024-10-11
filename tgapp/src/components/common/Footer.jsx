import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex w-full justify-between mt-3">
      <button className="btn w-1/3 bg-transportant border-none rounded-none">
      <FaHome size={20}/>
      </button>
      <button className="btn w-1/3 bg-transportant border-none rounded-none">
      <FaHeart size={20}/>
      </button>
      <button className="btn w-1/3 bg-transportant border-none rounded-none">
        <FaShoppingCart size={20}/>
      </button>
    </div>
  );
};

export default Footer;

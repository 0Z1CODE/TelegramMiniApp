import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();
  return (


    <div className="btm-nav static mt-3">
      <button className="bg-accent text-blue-600" onClick={() => navigate('/')}>
        <FaHome size={20} />
        <span className="btm-nav-label">Головна</span>
      </button>
      <button className="bg-orange-200 text-orange-600">
        <FaHeart size={20} />
        <span className="btm-nav-label">Побажання</span>
      </button>
      <button className="bg-teal-200 text-teal-600">
        <FaShoppingCart size={20} />
        <span className="btm-nav-label">Корзина</span>
      </button>
    </div>
  );
};

export default Footer;

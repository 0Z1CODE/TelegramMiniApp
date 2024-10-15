import React from "react";
import { useNavigate } from "react-router-dom";
import { SiPcgamingwiki } from "react-icons/si";
import { BsPciCardNetwork } from "react-icons/bs";
import { BsFillMouse3Fill } from "react-icons/bs";

const CategoryCard = ({ alt, catName, description, link, isActive }) => {
  const nav = useNavigate();

  const RenderIcon = () => {
    switch (alt) {
      case "pc":
        return (
          <SiPcgamingwiki className="w-24 h-24 text-zinc-600 text-center bg-slate-200  rounded-full p-4 " />
        );
      case "tower":
        return (
          <BsPciCardNetwork className="w-24 h-24 text-zinc-600 text-center bg-slate-200  rounded-full p-4 " />
        );
      case "equipment":
        return (
          <BsFillMouse3Fill className="w-24 h-24 text-zinc-600 text-center bg-slate-200  rounded-full p-4 " />
        );
    }
  };

  return (
    <div
      className="flex-col flex justify-start items-center border p-3 rounded-lg cursor-pointer relative"
      onClick={() => nav(link)}
    >
      {!isActive && (
        <div className="badge badge-info gap-2 absolute top-0 right-0">

          в розробці
        </div>

      )}
      <RenderIcon />
      <h3 className="text-center mt-3">{catName}</h3>
    </div>
  );
};

export default CategoryCard;

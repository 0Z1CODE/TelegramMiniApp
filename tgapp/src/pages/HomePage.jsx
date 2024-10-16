import React,{useEffect} from "react";
import Category from "../components/Category/Category";
import Bunner from "../components/Bunner/Bunner";
import pc from "./../assets/img/icons/pc.svg";
import useAppSettings from "../../zustand/useAppSettings";

const HomePage = () => {
  const { setPageTitle } = useAppSettings();
  useEffect(() => {
    setPageTitle("Головна сторінка");
  }, []);
  return (
    <>
      <Bunner />
{/* <img src={pc} alt="pc" className="w-12 h-12 text-orange-500" /> */}
{/* <div className="badge badge-ghost">Системні блоки</div>
<div className="badge badge-ghost">Конфігуратор</div>
<div className="badge badge-ghost">Переферія</div>
<div className="badge badge-ghost">Комплектуючі</div> */}
      <Category />
    </>
  );
};

export default HomePage;

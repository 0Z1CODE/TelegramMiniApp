import React from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <CategoryCard
        alt="pc"
        catName={"Готові ПК"}
        description={"Готові ПК з гарантією"}
        link="/ready-pc"
        isActive={true}

      />
      <CategoryCard
        alt="tower"
        catName={"Комплектуючі для ПК"}
        description={"Збери сам"}
        isActive={false}
      />
      <CategoryCard
        alt="equipment"
        catName={"Комп'ютерна перефірія"}
        description={"Девайси для вашого ПК"}
        isActive={false}
      />
    </div>
  );
};

export default Category;

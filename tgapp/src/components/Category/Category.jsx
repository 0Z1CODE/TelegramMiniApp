import React from 'react'
import CategoryCard from './CategoryCard'
import pc from "./../../assets/img/pc.png" 
import tower from "./../../assets/img/pc-tower.png" 
import equipment from "./../../assets/img/equipment.png" 

const Category = () => {
  return (
    <div className='flex-col w-full '>
      <CategoryCard picture={pc} alt = "pc" catName={"Готові ПК"} description={"Готові ПК з гарантією"}/>
      <CategoryCard picture={tower} alt = "tower" catName={"Комплектуючі для ПК"} description={"Збери сам"}/>
      <CategoryCard picture={equipment} alt = "equipment" catName={"Комп'ютерна перефірія"} description={"Девайси для вашого ПК"}/>
    </div>
  )
}

export default Category
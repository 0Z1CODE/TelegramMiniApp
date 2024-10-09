import React from 'react'

const CategoryCard = ({picture, alt, catName, description}) => {
  return (
   <div className='flex bg-base-100 mb-3 gap-2 p-3 rounded-xl shadow-sm shadow-primary'>
      <img src={picture} alt={alt}  width={"110px"} className = "p-3"/>
     <div className='flex-col w-full'>
      <h3 className='text-black font-extrabold'>{catName}</h3>
      <p className='font-thin'>{description}</p>
      <div className='flex justify-end'>
      <button className='btn btn-md text-white bg-info mt-2 '>До категорії</button>
      </div>
     
     </div>
     
   </div>
  )
}

export default CategoryCard
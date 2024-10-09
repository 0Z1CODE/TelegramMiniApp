import React from 'react'
import { useTgContext } from '../../context/tgContext'
import ProductModal from './../common/ProductModal'

const Products = ({products}) => {
  // const {telegramApp} = useTgContext()
  

  return (
   <div className="flex-col gap-1 w-full ">
      {products.map(product => (
     <div className='w-full mb-3'>
        <div key={product.id} className='bg-base-200 flex  backdrop-blur-sm'>
           <img src={product.image} alt={product.name}/>
         <div>
         <h3>{product.name}</h3>
          <p>{product.description}</p>
         
          <p>{product.price}</p>
         </div>
       
        </div>
         <ProductModal product_alias = {`id-${product.id}`} product_name = {product.name}/>
     </div>
      ))}
   </div>
  )
}

export default Products
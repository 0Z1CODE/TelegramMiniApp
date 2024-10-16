import React, { useEffect, useCallback, useState } from 'react'
import { useTgContext } from '../../context/tgContext'
import { useNavigate, useParams } from 'react-router-dom'
import useProducts from '../../api/useProducts'
import useAppSettings from '../../../zustand/useAppSettings'


const QuickOrder = () => {
  const { getProductById, loading } = useProducts()
  const { setPageTitle } = useAppSettings()
  const [product, setProduct] = useState(null)
  const { telegramApp } = useTgContext()
  const params = useParams()
  // const navigate = useNavigate()

  const getProduct = useCallback(async () => {
    await getProductById(params.product_code).then((data) => setProduct(data)).catch((error) => console.log(error));
    return () => {
      setProduct(null);
    }
  }, [])

  useEffect(() => {
    getProduct()
    setPageTitle("Швидке замовлення")
    return () => {
      setProduct(null)
    }
  }, [])

  return (
    <>
      <section>

        {product && (
          <div className="card lg:card-side bg-base-100 shadow-md">
            <figure>
              <img
                src={product?.images[0]}
                alt="Album" />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{product?.title}</h2>
              <p className="flex h-auto flex-grow-0">{product?.description}</p>
              <form className="form-control">
                <label className="form-control w-full max-w-xs mb-3">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs input-accent " />

                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs input-accent " />

                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs input-accent " />

                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs input-accent " />

                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs input-accent " />

                </label>
              </form>

            </div>
          </div>
        )}

      </section>
    </>
  )
}

export default QuickOrder
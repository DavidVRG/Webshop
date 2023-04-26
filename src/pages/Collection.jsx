import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContext'

export default function Collection() {

  // Scroll to top
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Get all products from ProductsContext
  const { products } = useContext(ProductsContext)

  // Useparams for fetch data
  const params = useParams()

  return (
    <main className='my-12 md:my-24 w-[95%] lg:w-[80%] mx-auto'>

      <h1 className="text-center lg:text-start text-3xl lg:text-4xl font-semibold capitalize-first">{params.id} Collection</h1>
      <div className='text-center lg:text-start mt-3 text-neutral-500 md:text-lg border-b-[1px] pb-12 border-neutral-200'>
        <p>Browse our {params.id} collection!</p>
        <p>You will surely find the product for you!</p>
      </div>

      <section className='mt-14 flex flex-wrap justify-center gap-8'>
        {products.length !== 0 && (
          products.map((product) => {
            if (product.data.collection === params.id) {
              return (
                <div key={product.id} className="relative flex w-full sm:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <Link
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    to={`/product/${product.id}`}>
                    <img className="object-cover w-full" src={product.data.image} alt={product.data.title} />
                    {product.data.discounted && <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{((product.data.discountedPrice / product.data.price) * 100).toFixed(0)}% OFF</span>}
                  </Link>
                  <div className="mt-4 px-5 pb-5">
                    <Link
                      to={`/product/${product.id}`}>
                      <h5 className="text-xl tracking-tight text-slate-900">{product.data.title}</h5>
                    </Link>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl mr-1 font-bold text-slate-900">${product.data.discounted ? product.data.discountedPrice : product.data.price}</span>
                        {product.data.discounted && <span className="text-sm text-slate-900 line-through">${product.data.price}</span>}
                      </p>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className='flex items-center transition duration-200 ease-in-out justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to cart
                    </Link>
                  </div>
                </div>
              )
            }
          })
        )}
      </section>

    </main>
  )
}

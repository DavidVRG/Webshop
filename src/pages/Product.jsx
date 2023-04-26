import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContext'

export default function Product({ setCart }) {

  // Ref for outsideClick
  const outsideClick = useRef()

  // Get all products from ProductsContext
  const { products, cart } = useContext(ProductsContext)

  // Set single product
  const [singleProduct, setSingleProduct] = useState(null)

  // Order count
  const [orderCount, setOrderCount] = useState(1)

  // Useparams for fetch data
  const params = useParams()

  // Show fullscreen image
  const [showFullScreenImage, setShowFullScreenImage] = useState(false)

  // Get single product
  useEffect(() => {
    products.forEach((product) => {
      if (product.id === params.id) {
        setSingleProduct(product)
      }
    })
  }, [products])

  // If the user click outside then the currrent component set to hidden
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the previous comments is open and the clicked target is not within the previous comments,
      // then close the previous comments
      if (showFullScreenImage !== false && outsideClick.current && !outsideClick.current.contains(e.target)) {
        setShowFullScreenImage(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showFullScreenImage])

  // Add product to cart
  function addToCart() {
    if (cart.length === 0) {
      setCart([...cart, {
        id: singleProduct.id,
        quantity: orderCount,
        collection: singleProduct.data.collection,
        price: singleProduct.data.discounted ? singleProduct.data.discountedPrice * orderCount : singleProduct.data.price * orderCount,
        title: singleProduct.data.title,
        image: singleProduct.data.image
      }])
    } else {
      cart.forEach((item) => {
        if (item.id === singleProduct.id) {
          const newCartArray = cart
          const index = newCartArray.findIndex((cartItem) => cartItem.id === singleProduct.id)
          newCartArray[index].quantity = orderCount
          newCartArray[index].price = singleProduct.data.discounted ? singleProduct.data.discountedPrice * orderCount : singleProduct.data.price * orderCount
          setCart([...newCartArray])
        } else {
          setCart([...cart, {
            id: singleProduct.id,
            quantity: orderCount,
            collection: singleProduct.data.collection,
            price: singleProduct.data.discounted ? singleProduct.data.discountedPrice * orderCount : singleProduct.data.price * orderCount,
            title: singleProduct.data.title,
            image: singleProduct.data.image
          }])
        }
      })
    }
  }


  return (
    singleProduct && (
      <main className='my-12 md:my-24 w-[95%] lg:w-[80%] mx-auto'>

        <section className={`${showFullScreenImage ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-90`}>
          <div className='relative'>
            <div className='w-[95%] sm:w-max mx-auto'>
              <img src={singleProduct.data.image} alt={singleProduct.data.title} className='object-contain object-center max-w-5xl max-h-[600px] h-full w-full rounded-md shadow-sm' />
              <button className='absolute top-2 right-4 sm:right-2 text-white bg-slate-900 hover:bg-slate-700 transition duration-200 ease-in-out rounded-md'
                onClick={() => setShowFullScreenImage(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className='flex gap-8 flex-col md:flex-row justify-center items-center md:items-start'>

          <div ref={outsideClick} className='relative w-full shrink-0 md:w-1/2 rounded-lg cursor-pointer' onClick={() => setShowFullScreenImage(true)}>
            <img src={singleProduct.data.image} alt={singleProduct.data.title} className='w-full h-full max-h-80 sm:max-h-[400px] md:max-h-full object-center object-cover rounded-lg' />
            <button className='absolute bottom-2 left-[50%] -translate-x-[50%] flex gap-1 items-center text-white bg-slate-900 bg-opacity-90 py-2 px-4 rounded-3xl font-medium hover:bg-opacity-100 transition duration-100 ease-in-out'>
              Click to Expand
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </button>
          </div>

          <div className='sticky top-5 w-full max-w-md flex flex-col gap-6'>

            <h1 className='text-4xl font-semibold'>{singleProduct.data.title}</h1>

            <div className='flex items-center gap-3'>
              <div className='w-max flex items-center justify-center border-2 border-green-500 py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold rounded-lg cursor-default'>
                <span className='text-green-500 !leading-none'>${singleProduct.data.discounted ? singleProduct.data.discountedPrice : singleProduct.data.price}</span>
              </div>
              {singleProduct.data.discounted && (
                <div className='text-green-500 line-through font-semibold'>
                  <span>${singleProduct.data.price}</span>
                </div>
              )}
            </div>

            <div className='leading-6'>
              <h2 className='text-slate-700 font-medium bg-slate-100/80 p-2 mb-3 rounded-lg'>Description</h2>
              <div className='text-slate-600 p-1'>{singleProduct.data.description}</div>
            </div>

            <div className='flex items-center gap-4'>

              <div className='flex items-center gap-6 bg-slate-100/80 py-4 px-2 rounded-lg text-slate-700'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:text-slate-900"
                  onClick={() => {
                    orderCount > 1 && setOrderCount(prevState => prevState - 1)
                  }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='text-lg'>{orderCount}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:text-slate-900"
                  onClick={() => {
                    orderCount < 10 && setOrderCount(prevState => prevState + 1)
                  }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <button
                onClick={addToCart}
                className='w-full flex gap-2 font-medium bg-slate-900 hover:bg-slate-800 transition duration-200 ease-in-out text-white py-4 px-8 justify-center rounded-3xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add to Cart
              </button>

            </div>

          </div>

        </section>
      </main>
    )
  )
}
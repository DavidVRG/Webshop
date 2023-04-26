import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { Link } from 'react-router-dom'

export default function Cart({ showCartComponent, setShowCartComponent, setCart }) {

    // Ref for outsideclick
    const ref = useRef()

    // Get cart items
    const { cart } = useContext(ProductsContext)

    // Set sum price
    const [sumPrice, setSumPrice] = useState(0)

    // Sum price in cart array
    useEffect(() => {
        if (cart.length !== 0) {
            let sumPrice = 0
            cart.forEach((item) => {
                sumPrice = sumPrice + item.price
            })
            setSumPrice(sumPrice)
        }

    }, [cart])

    // If the user click outside then the currrent component set to hidden
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showCartComponent !== false && ref.current && !ref.current.contains(e.target)) {
                setShowCartComponent(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showCartComponent])

    // Remove product
    function removeProduct(item) {
        const index = cart.findIndex((cartItem) => cartItem.id === item.id)
        const newCartArray = cart
        newCartArray.splice(index, 1)
        setCart([...newCartArray])
    }

    return (
        <div className={`relative z-30 transition-all duration-500 ${showCartComponent ? "md:opacity-100 visible" : "md:opacity-0 invisible"}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 md:bg-gray-500 opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10 transition-all duration-500 ease-in-out sm:duration-700 ${showCartComponent ? "translate-x-0" : "translate-x-full"}`}>

                        <div ref={ref} className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                                    onClick={() => setShowCartComponent(false)}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                {cart.length !== 0 && (
                                                    cart.map((item, id) => {
                                                        return (
                                                            <li key={id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img src={item.image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href="#">{item.title}</a>
                                                                            </h3>
                                                                            <p className="ml-4">${item.price}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{item.collection}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">Qty {item.quantity}</p>

                                                                        <div className="flex">
                                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            onClick={() => removeProduct(item)}>Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                )}

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${sumPrice}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <Link
                                            onClick={() => setShowCartComponent(false)}
                                            to="/checkout"
                                            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                                            Checkout
                                        </Link>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or
                                            <Link
                                                onClick={() => setShowCartComponent(false)}
                                                className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
                                                to="/collections"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

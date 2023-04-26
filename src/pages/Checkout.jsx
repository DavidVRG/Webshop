import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ setCart }) {

    // Get cart from ProductsContext
    const { cart } = useContext(ProductsContext)

    // Navigate if success the order
    const navigate = useNavigate()

    // Remove product
    function removeProduct(item) {
        const index = cart.findIndex((cartItem) => cartItem.id === item.id)
        const newCartArray = cart
        newCartArray.splice(index, 1)
        setCart([...newCartArray])
    }

    // Set sum price
    const [sumPrice, setSumPrice] = useState(0)

    // Sum price in cart array
    useEffect(() => {
        if (cart.length !== 0) {
            let sumPrice = 5
            cart.forEach((item) => {
                sumPrice = sumPrice + item.price
            })
            setSumPrice(sumPrice)
        }

    }, [cart])

    // Order data
    const [orderData, setOrderData] = useState({
        name: "",
        email: "",
        zip: "",
        country: "",
        city: "",
        street: ""
    })
    const { name, email, zip, country, city, street } = orderData

    // Set order data
    function setOrderDataFunction(e) {
        setOrderData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // Create order function
    async function createOrder(event) {
        event.preventDefault()
        if(cart.length === 0) return

        await addDoc(collection(db, "orders"), {
            name: name,
            email: email,
            zip: zip,
            country: country,
            city: city,
            street: street,
            cart: cart,
            sumPrice: sumPrice
        })
            .then((res) => {
                navigate(`/success/${res.id}`, { state: {id: res.id }});
            })
            .catch((error) => {
                toast('Please try again!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    return (
        <main className='my-12 md:my-24 w-[95%] lg:w-[80%] mx-auto'>

            <h1 className="text-center lg:text-start text-3xl lg:text-4xl font-semibold capitalize-first">Checkout</h1>
            <div className='text-center lg:text-start mt-3 text-neutral-500 md:text-lg border-b-[1px] pb-12 border-neutral-200'>
                <p>Here you can order your products!</p>
            </div>

            {cart.length === 0 ? (
                <div className='mt-24 flex justify-center'>
                    <h1 className='text-3xl text-slate-900 font-semibold'>Your Cart is empty!</h1>
                </div>
            ) : (
                <div className='flex flex-col-reverse md:flex-row mt-8 gap-4 md:gap-0'>

                    <div className='w-full sm:w-1/2 md:w-full mx-auto'>
                        <form className='max-w-xl flex flex-col gap-5' onSubmit={createOrder}>
                            <input
                                type="text"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='Full name'
                                name="name"
                                value={name}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />
                            <input
                                type="email"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='Email address'
                                name="email"
                                value={email}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />
                            <input
                                type="number"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='Zip'
                                name="zip"
                                value={zip}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />
                            <input
                                type="text"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='Country'
                                name="country"
                                value={country}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />
                            <input
                                type="text"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='City'
                                name="city"
                                value={city}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />
                            <input
                                type="text"
                                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                                placeholder='Street address'
                                name="street"
                                value={street}
                                onChange={(e) => setOrderDataFunction(e)}
                                required />

                            <button
                                type='submit'
                                className='flex items-center transition duration-200 ease-in-out justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Submit order
                            </button>
                        </form>
                    </div>

                    <div className='hidden md:block h-[60vh] w-[1px] bg-slate-300 mx-20' />

                    <div className='w-full'>
                        <div className="flow-root">
                            <ul role="list" className="max-h-[500px] divide-y overflow-y-scroll divide-gray-200">

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

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${sumPrice}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping cost included ($5)</p>
                            </div>

                        </div>
                    </div>

                </div>
            )}

        </main>
    )
}
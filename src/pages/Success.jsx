import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase/firebase'

export default function Success({ setCart }) {

    // Get id from order
    const { state } = useLocation()

    // Order data
    const [orderData, setOrderData] = useState(null)

    useEffect(() => {
        async function orderData() {
            const docRef = doc(db, "orders", state.id)
            const docSnap = await getDoc(docRef)
            setOrderData(docSnap.data())
            setCart([])
        }
        orderData()
    }, [state])

    return (
        orderData && (
            <main className='my-12 md:my-24 w-[95%] lg:w-[80%] mx-auto'>
                <div className='flex flex-col items-center gap-8'>
                    <h1 className='text-3xl font-semibold'>Order Success</h1>

                    <table className="table-fixed">
                        <tbody>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Name:</td>
                                <td className='py-1 pr-4'>{orderData.name}</td>
                            </tr>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Email:</td>
                                <td className='py-1 pr-4'>{orderData.email}</td>
                            </tr>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Country:</td>
                                <td className='py-1 pr-4'>{orderData.country}</td>
                            </tr>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>City:</td>
                                <td className='py-1 pr-4'>{orderData.city}</td>
                            </tr>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Zip:</td>
                                <td className='py-1 pr-4'>{orderData.zip}</td>
                            </tr>
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Street Address:</td>
                                <td className='py-1 pr-4'>{orderData.street}</td>
                            </tr>
                            {orderData.cart.map((item, id) => {
                                return (
                                    <tr key={id} className='border-2'>
                                        <td className='py-1 pr-4'>Ordered item:</td>
                                        <td className='py-1 pr-4'>{item.title} x{item.quantity}</td>
                                    </tr>
                                )
                            })}
                            <tr className='border-2'>
                                <td className='py-1 pr-4'>Total Price:</td>
                                <td className='py-1 pr-4'>${orderData.sumPrice}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </main>
        )
    )
}
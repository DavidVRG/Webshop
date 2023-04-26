import React, { useContext, useState } from 'react'
import Cart from './Cart'
import Search from './Search'
import { Link } from 'react-router-dom'
import { ProductsContext } from '../../context/ProductsContext'

export default function Navbar({ setCart }) {

    // Get cart items for cart length
    const { cart } = useContext(ProductsContext)

    // Show/hide mobile navbar
    const [showMobileNavbar, setShowMobileNavbar] = useState(false)

    // Show/hide cart component
    const [showCartComponent, setShowCartComponent] = useState(false)

    // Show/hide search component
    const [showSearch, setShowSearch] = useState(false)

    return (
        <nav className='relative top-0 bg-white w-full'>

            <div className='w-[95%] lg:w-[80%] mx-auto flex h-[10vh]'>

                {/* Webshop Logo and Title */}
                <div className={`${showSearch ? "hidden" : "flex"} h-full w-1/2 lg:w-1/3 lg:flex justify-start`}>
                    <Link
                        to="/"
                        className='h-full flex items-center gap-2'>
                        <img src="logo.png" alt="Logo" className='w-10 h-10' />
                        <h1 className='text-2xl font-semibold tracking-wide'>Webshop</h1>
                    </Link>
                </div>

                {/* Desktop center navlinks and search */}
                {showSearch ? (
                    <Search showSearch={showSearch} setShowSearch={setShowSearch} />
                ) : (
                    <ul className='hidden lg:flex w-full h-full items-center justify-center gap-2 font-medium text-slate-700'>
                        <li>
                            <Link
                                to="/collection/men"
                                className='cursor-pointer py-3 px-4 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'>
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/collection/women"
                                className='cursor-pointer py-3 px-4 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'>
                                Women
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/collection/beauty"
                                className='cursor-pointer py-3 px-4 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'>
                                Beauty
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/collection/sport"
                                className='cursor-pointer py-3 px-4 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'>
                                Sport
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/collections"
                                className='cursor-pointer py-3 px-4 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'>
                                Collections
                            </Link>
                        </li>
                    </ul>
                )}

                {/* Desktop right navlinks */}
                <ul className='hidden lg:flex w-1/3 h-full items-center justify-end gap-1 text-slate-700'>

                    <li className='cursor-pointer w-10 h-10 p-2 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'
                        onClick={() => setShowSearch(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </li>

                    <li className='relative cursor-pointer w-10 h-10 p-2 rounded-3xl transition duration-200 ease-in-out hover:bg-gray-100'
                        onClick={() => setShowCartComponent(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <div className='absolute z-10 top-2 right-1 flex items-center justify-center w-4 h-4 bg-blue-400 text-white rounded-full shadow-sm'>
                            <div className='text-xs'>{cart.length}</div>
                        </div>
                    </li>

                </ul>

                {/* Mobile right navbuttons */}
                {!showSearch && (
                    <ul className='flex lg:hidden w-1/2 h-full items-center justify-end'>

                        <li className='relative w-10 h-10 p-2'
                            onClick={() => setShowCartComponent(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <div className='absolute z-10 top-2 right-1 flex items-center justify-center w-4 h-4 bg-blue-400 text-white rounded-full shadow-sm'>
                                <div className='text-xs'>{cart.length}</div>
                            </div>
                        </li>

                        <li className='relative w-10 h-10 p-2'
                            onClick={() => setShowSearch(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </li>

                        <li className='w-12 h-12 p-2' onClick={() => setShowMobileNavbar(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </li>

                    </ul>
                )}

                {/* Mobile sidebar */}

                <div className={`relative z-30 transition-all duration-500 ${showMobileNavbar ? "md:opacity-100 visible" : "md:opacity-0 invisible"}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                    <div className="fixed lg:hidden inset-0 md:bg-gray-500 opacity-75 transition-opacity"></div>

                    <div className={`${showMobileNavbar ? "translate-x-0" : "translate-x-full"} block lg:hidden transition-all duration-500 fixed z-20 top-0 right-0 w-full max-w-md h-full py-5 px-4 bg-white`}>

                        <div className='flex justify-between items-center mb-4'>
                            <Link
                                to="/"
                                className='w-1/2 md:w-1/3 h-full flex items-center justify-start gap-2'>
                                <img src="logo.png" alt="Favicon" className='w-10 h-10' />
                                <h1 className='text-2xl font-semibold tracking-wide'>Menu</h1>
                            </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                                onClick={() => setShowMobileNavbar(false)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <ul className='flex flex-col gap-4 font-medium text-lg tracking-wide'>
                            <li>
                                <Link to="/collection/men" onClick={() => setShowMobileNavbar(false)}>Men</Link>
                            </li>
                            <li>
                                <Link to="/collection/women" onClick={() => setShowMobileNavbar(false)}>Women</Link>
                            </li>
                            <li>
                                <Link to="/collection/beauty" onClick={() => setShowMobileNavbar(false)}>Beauty</Link>
                            </li>
                            <li>
                                <Link to="/collection/sport" onClick={() => setShowMobileNavbar(false)}>Sport</Link>
                            </li>
                            <li>
                                <Link to="/collections" onClick={() => setShowMobileNavbar(false)}>Collections</Link>
                            </li>
                        </ul>

                    </div>

                </div>

                {/* Cart sidebar */}
                <Cart showCartComponent={showCartComponent} setShowCartComponent={setShowCartComponent} setCart={setCart} />

            </div>

        </nav>
    )
}
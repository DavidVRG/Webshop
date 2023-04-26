import React, { useEffect, useRef } from 'react'

export default function Search({ setShowSearch, showSearch }) {

    // Ref for outsideclick
    const ref = useRef()

    // If the user click outside then the currrent component set to hidden
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showSearch !== false && ref.current && !ref.current.contains(e.target)) {
                setShowSearch(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showSearch])

    return (
        <div ref={ref} className='flex w-full md:w-1/3 h-full items-center'>

            <label
                htmlFor="search"
                className='bg-gray-100 h-[70%] rounded-tl-2xl rounded-bl-2xl flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-700 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </label>

            <input
                className='bg-gray-100 placeholder-slate-500 w-full h-[70%] p-2 focus:outline-none'
                type="text"
                id='search'
                placeholder='Type and press enter' />

            <div className='bg-gray-100 h-[70%] rounded-tr-2xl rounded-br-2xl flex items-center'
                onClick={() => setShowSearch(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mr-2 text-slate-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

        </div>
    )
}

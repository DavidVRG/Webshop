import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';

export default function Collections() {

    // Ref for navigate
    const swiperRef = useRef();

    // Fetched from collections.json
    const [collectionsData, setCollectionsData] = useState([])

    // Fetch data from collections.json
    useEffect(() => {
        async function getHeaderData() {
            const res = await fetch('collections.json')
            const data = await res.json()
            setCollectionsData(data)
        }
        getHeaderData()
    }, [])

    return (
        <section className='my-24'>

            <div className='flex flex-col lg:flex-row lg:justify-between gap-3 items-center mb-6 lg:mb-14'>
                <h2 className='flex flex-col lg:flex-row lg:gap-2 text-3xl md:text-4xl text-center lg:text-start font-semibold '>
                    Discover more.
                    <span className='text-neutral-500'>Good things are waiting for you</span>
                </h2>
                <div className='flex gap-3 text-neutral-500'>
                    <button onClick={() => swiperRef.current.slidePrev()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button onClick={() => swiperRef.current.slideNext()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {collectionsData.length !== 0 && (
                <Swiper
                    className='h-full'
                    spaceBetween={25}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        800: {
                            slidesPerView: 2
                        },
                        1450: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {collectionsData.map((collection, id) => {
                        return (
                            <SwiperSlide key={id} className='w-full h-60 flex justify-between rounded-xl shadow-sm' style={{ backgroundColor: collection.color }}>
                                <div className='flex flex-col p-2 justify-between'>
                                    <div>
                                        <span className='block mb-2 text-sm text-slate-700'>{collection.subtitle}</span>
                                        <h2 className='text-xl md:text-2xl text-slate-900 font-semibold'>{collection.title}</h2>
                                    </div>
                                    <Link
                                        to={collection.url}
                                        className='py-2 px-3 mb-2 w-max bg-white hover:bg-gray-100 transition ease-in-out duration-200 shadow-sm rounded-3xl'>
                                        Explore now
                                    </Link>
                                </div>
                                <div>
                                    <img src={collection.image} alt={collection.title} className='h-full rounded-tr-xl rounded-br-xl' />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}

        </section>
    )
}

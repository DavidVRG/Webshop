import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';

export default function Header() {

  // Fetched from header.json
  const [headerData, setHeaderData] = useState([])

  // Fetch data from header.json
  useEffect(() => {
    async function getHeaderData() {
      const res = await fetch('header.json')
      const data = await res.json()
      setHeaderData(data)
    }
    getHeaderData()
  }, [])

  return (
    headerData.length !== 0 && (
      <Swiper
        className='h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] 2xl:h-[90vh]'
        modules={[Autoplay]}
        autoplay={{
          delay: 5000
        }}
        slidesPerView={1}
      >

        {
          headerData.map((data, id) => {
            return (
              <SwiperSlide key={id} className='bg-cover bg-center' style={{ backgroundImage: `url(${data.image})` }}>
                <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                  <div className="text-center">
                    <h1 className="text-white text-2xl font-semibold uppercase md:text-5xl">{data.title}</h1>
                    <Link
                      to={data.url}
                      className='inline-block transition ease-in-out duration-200 mt-4 px-4 py-2 bg-blue-600 text-white text-md uppercase font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-500'>
                      {data.buttonTitle}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    )
  )
}

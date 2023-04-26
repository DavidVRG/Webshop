import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Collections() {

  // Scroll to top
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Fetched from collections.json
  const [collectionsData, setCollectionsData] = useState([])

  // Fetch data from collections.json
  useEffect(() => {
    async function getHeaderData() {
      const res = await fetch('/collections.json')
      const data = await res.json()
      setCollectionsData(data)
    }
    getHeaderData()
  }, [])

  return (
    <main className='my-12 md:my-24 w-[95%] lg:w-[80%] mx-auto'>

      <h1 className="text-center lg:text-start text-3xl lg:text-4xl font-semibold">Collections</h1>
      <div className='text-center lg:text-start mt-3 text-neutral-500 md:text-lg border-b-[1px] pb-12 border-neutral-200'>
        <p>Browse our collections!</p>
        <p>You will surely find the product for you!</p>
      </div>

      <section className='mt-14 flex flex-wrap justify-center gap-8'>
        {collectionsData.length !== 0 && (
          collectionsData.map((collection, id) => {
            return (
              <Link to={collection.url} key={id} className='w-[400px] h-60 flex justify-between rounded-xl shadow-sm' style={{ backgroundColor: collection.color }}>
                <div className='flex flex-col p-2 justify-between'>
                  <div>
                    <span className='block mb-2 text-sm text-slate-700'>{collection.subtitle}</span>
                    <h2 className='text-xl md:text-2xl text-slate-900 font-semibold'>{collection.title}</h2>
                  </div>
                  <button
                    className='py-2 px-3 mb-2 w-max bg-white hover:bg-gray-100 transition ease-in-out duration-200 shadow-sm rounded-3xl'>
                    Explore now
                  </button>
                </div>
                <div>
                  <img src={collection.image} alt={collection.title} className='h-full rounded-tr-xl rounded-br-xl' />
                </div>
              </Link>
            )
          })
        )}
      </section>

    </main>
  )
}
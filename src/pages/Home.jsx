import React from 'react'
import Header from '../components/Home/Header'
import Collections from '../components/Home/Collections'
import NewProducts from '../components/Home/NewProducts'
import DiscountedProducts from '../components/Home/DiscountedProducts'

export default function Home() {
  return (
    <main>
      <Header />
      <div className='w-[95%] lg:w-[80%] mx-auto'>
        <Collections />
        <NewProducts />
        <DiscountedProducts />
      </div>
    </main>
  )
}

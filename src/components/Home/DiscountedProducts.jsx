import { useContext } from "react"
import { ProductsContext } from "../../context/ProductsContext"
import { Link } from "react-router-dom"


export default function DiscountedProducts() {

    // Get all products from ProductsContext
    const { products } = useContext(ProductsContext)

    return (
        products.length !== 0 && (
            <section className='my-24'>

                <div className='text-center mb-10 lg:mb-14'>
                    <h2 className='text-3xl md:text-4xl mb-8 font-semibold'>
                        Discounted Products
                    </h2>
                    <Link
                        to="/discounted-products"
                        className="bg-slate-900  font-medium hover:bg-gray-700 transition ease-in-out duration-200 text-white rounded-md shadow-sm px-5 py-2.5">
                        All Discounted Products
                    </Link>
                </div>

                <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6'>
                    {products.filter((product) => product.data.discounted).map((product, index) => {
                        if (index < 4) {
                            return (
                                <div key={product.id} className="relative flex w-full sm:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                    <Link
                                        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                                        to={`product/${product.id}`}>
                                        <img className="object-cover w-full" src={product.data.image} alt={product.data.title} />
                                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{((product.data.discountedPrice / product.data.price) * 100).toFixed(0)}% OFF</span>
                                    </Link>
                                    <div className="mt-4 px-5 pb-5">
                                        <Link
                                            to={`product/${product.id}`}>
                                            <h5 className="text-xl tracking-tight text-slate-900">{product.data.title}</h5>
                                        </Link>
                                        <div className="mt-2 mb-5 flex items-center justify-between">
                                            <p>
                                                <span className="text-3xl mr-1 font-bold text-slate-900">${product.data.discountedPrice}</span>
                                                <span className="text-sm text-slate-900 line-through">${product.data.price}</span>
                                            </p>
                                        </div>
                                        <Link
                                            to={`product/${product.id}`}
                                            className="flex items-center justify-center transition duration-200 ease-in-out rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to cart
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>

            </section>
        )
    )
}

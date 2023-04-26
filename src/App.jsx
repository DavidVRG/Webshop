import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Basics/Navbar"
import Footer from "./components/Basics/Footer"
import Collections from "./pages/Collections"
import Collection from "./pages/Collection"
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import { ProductsContext } from "./context/ProductsContext"
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase/firebase"
import DiscountedProducts from "./pages/DiscountedProducts"
import Success from "./pages/Success"
import Search from "./pages/Search"

function App() {

  // Set products
  const [products, setProducts] = useState([])

  // Set cart
  const [cart, setCart] = useState([])

  // Get products from firebase
  useEffect(() => {
    async function getProducts() {
      const q = query(collection(db, "products"), orderBy("timestamp", "desc"))
      const querySnapshot = await getDocs(q)
      const productsArray = []
      querySnapshot.forEach((doc) => {
        productsArray.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setProducts(productsArray)
    }
    getProducts()
  }, [])


  return (
    <ProductsContext.Provider value={{ products: products, cart: cart }}>
      <div className="App">
        <Navbar setCart={setCart} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collection/:id" element={<Collection />} />
            <Route path="/product/:id" element={<Product setCart={setCart} />} />
            <Route path="/discounted-products" element={<DiscountedProducts />} />
            <Route path="/checkout" element={<Checkout setCart={setCart} />} />
            <Route path="/success/:id" element={<Success setCart={setCart} />} />
            <Route path="/search/:id" element={<Search />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ProductsContext.Provider>
  )

}

export default App

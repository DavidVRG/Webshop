import { createContext } from 'react';

// Provider in app.jsx
export const ProductsContext = createContext({
    products: [],
    cart: []
});
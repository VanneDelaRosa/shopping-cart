import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const resetCart = () => setCart([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />

        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} resetCart={resetCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
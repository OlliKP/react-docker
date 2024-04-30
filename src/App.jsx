import { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import About from './components/About/About';
import Cart from './components/Cart/Cart';

export const CartContext = createContext(null);

function App() {
  const [cartItems, setCartItems] = useState([]);

  const cart = {
    cartItems: cartItems,
    setCartItems: (value) => {
      setCartItems((oldItems) => [...oldItems, value]);
    },
    buyItems: () => {
      let orders = [];
      if (localStorage.getItem('orders') !== null) {
        orders = JSON.parse(localStorage.getItem('orders'));
      }
      orders.push(cartItems);
      localStorage.setItem('orders', JSON.stringify(orders));
      setCartItems([]);
    },
  };

  return (
    <Router>
      <CartContext.Provider value={cart}>
        <Header cartItems={cartItems} />
      </CartContext.Provider>
      <Routes>
        <Route
          path="/shop"
          element={
            <CartContext.Provider value={cart}>
              <Shop />
            </CartContext.Provider>
          }
        />

        <Route path="/omos" element={<About />} />
        <Route
          path="/kurv"
          element={
            <CartContext.Provider value={cart}>
              <Cart />
            </CartContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

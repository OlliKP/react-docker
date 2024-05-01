import React, { useState } from 'react';
import { CartContext } from '../../App';
import { useContext } from 'react';
import ShopItem from '../Shop/ShopItem';
import Button from 'react-bootstrap/Button';
import './Cart.css';
import { Card } from 'react-bootstrap';

const Cart = () => {
  const cart = useContext(CartContext);

  // Initialize totalPrice as a number
  let totalPrice = 0;

  // Loop through cartItems and add their prices
  for (let i = 0; i < cart.cartItems.length; i++) {
    // Convert item price to a number before adding
    totalPrice += parseFloat(cart.cartItems[i].price);
  }

  const [isBought, setIsBought] = useState(false);

  const handleBuyItems = () => {
    cart.buyItems();
    setIsBought(true);
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="container mt-5 pt-5 mx-auto">
        <h1 className="mt-5 Cronus-font">Din kurv</h1>
        {!isBought ? (
          <p>Der er ikke lagt nogle lækkerier i kurven endnu {':-('}</p>
        ) : (
          <p>Du har nu bestilt dine lækkerier :-P</p>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mt-5 Cronus-font">Din kurv</h1>
      <div className="row">
        {cart.cartItems.map((item, i) => (
          <div key={i} className="col-6 col-lg-3 mb-5">
            <ShopItem key={item.id} item={item} />
          </div>
        ))}
      </div>
      <Card className="bestilContainer">
        <p>Pris i alt: {totalPrice} kr.</p>
        <Button
          className="bestilBtn"
          variant="primary"
          onClick={handleBuyItems}
        >
          Bestil
        </Button>
      </Card>
    </div>
  );
};

export default Cart;

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Shop.css';

const ShopItem = ({ item, updateCart }) => {
  const handleAddToCart = () => {
    updateCart(item);
  };

  const isInCart = updateCart === undefined;

  console.log(item.images);
  // Function to strip HTML tags from the string
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <Card className="card-custom button h-100">
      <Card.Body className="button">
      <Card.Img className='product-image mb-4 w-100' variant="top" src={item.images[0].src} />
        <Card.Title className="Cronus-font"><strong>{item.name}</strong></Card.Title>
        <Card.Text className="description">{stripHtmlTags(item.description)}</Card.Text>
        <Card.Text className="price-custom">{item.price} kr.</Card.Text>
        {!isInCart && (
          <Button variant="primary" onClick={handleAddToCart}>
            Læg i kurv
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ShopItem;

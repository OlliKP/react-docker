import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const oauth = OAuth({
      consumer: {
        key: 'ck_0949511189625c7c3a26c8acf32bab174aa80fdb',
        secret: 'cs_6aaa4fb9d76a463af02b1009dda1e6ef5f6a1f78'
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
      }
    });

    const requestData = {
      url: 'http://localhost:8000/wp-json/wc/v3/products/',
      method: 'GET'
    };

    const authHeader = oauth.toHeader(oauth.authorize(requestData));

    axios.get(requestData.url, {
      headers: {
        Authorization: authHeader.Authorization
      }
    })
    .then((res) => setProducts(res.data))
    .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const productsJsx = products.map((product) => (
    <li key={product.id}>
      <h3>{product.name}</h3>
      <p>
        <strong>Description:</strong>{' '}
        <span dangerouslySetInnerHTML={{ __html: product.description }} />
      </p>
      <p><strong>Price:</strong> {product.price}</p>
      <p><strong>Category:</strong> {product.attributes.find(attr => attr.name === 'category').options[0]}</p>
      <p><strong>Type:</strong> {product.attributes.find(attr => attr.name === 'type').options[0]}</p>
      <p><strong>Brand:</strong> {product.attributes.find(attr => attr.name === 'brand').options[0]}</p>
      <img src={product.images[0].src}></img>
    </li>
  ));

  return (
    <div>
      <h1>Products</h1>
      <ul>{productsJsx}</ul>
    </div>
  );
}

export default App;

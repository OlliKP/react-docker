import React, { useEffect, useState } from 'react';
import ShopItem from './ShopItem';
import Slideshow from './Slideshow';
import axios from 'axios';
import { CartContext } from '../../App';
import { useContext } from 'react';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

const Shop = () => {
  const cart = useContext(CartContext);

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
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
        url: 'http://localhost:8000/wp-json/wc/v3/products/?per_page=100',
        method: 'GET'
      };

      const authHeader = oauth.toHeader(oauth.authorize(requestData));

      const response = await axios.get(requestData.url, {
        headers: {
          Authorization: authHeader.Authorization
        }
      });

      // Extract necessary attributes for each product
      const productsWithData = response.data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.attributes.find(attr => attr.name === 'category')?.options[0] || '', // Extract category
        type: product.attributes.find(attr => attr.name === 'type')?.options[0] || '', // Extract type
        brand: product.attributes.find(attr => attr.name === 'brand')?.options[0] || '', // Extract brand
        images: product.images
      }));
  
      setData(productsWithData); // Store modified data with extracted attributes in the state
  
      // Add console.log statement to inspect the fetched data
      console.log('Fetched data:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const typeMatch = selectedType ? item.type === selectedType : true;
    const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
    return categoryMatch && typeMatch && brandMatch;
  });

  return (
    <div>
      <Slideshow />
      <div className="container">
        <h1 className="mt-5 Cronus-font">Shoppen</h1>

        <div className='d-flex gap-2'>
          {/* Filter by category */}
          <select
            className="form-select"
            aria-label="Filter by category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Filtre efter kategori</option>
            <option value="Bolcher">Bolcher</option>
            <option value="Chokolade">Chokolade</option>
            <option value="Vingummi">Vingummi</option>
          </select>

          {/* Filter by type */}
          <select
            className="form-select"
            aria-label="Filter by type"
            onChange={handleTypeChange}
            value={selectedType}
          >
            <option value="">Filtre efter type</option>
            <option value="Chokoladebar">Chokoladebar</option>
            <option value="Chokoladestykker">Chokoladestykker</option>
            <option value="Plade Chokolade">Plade Chokolade</option>
            <option value="Slik">Slik</option>
          </select>

          {/* Filter by brand */}
          <select
            className="form-select"
            aria-label="Filter by brand"
            onChange={handleBrandChange}
            value={selectedBrand}
          >
            <option value="">Filtre efter brand</option>
            <option value="Cadbury">Cadbury</option>
            <option value="Ferrero">Ferrero</option>
            <option value="Haribo">Haribo</option>
            <option value="Hershey's">Hershey's</option>
            <option value="Jelly Belly">Jelly Belly</option>
            <option value="Lindt">Lindt</option>
            <option value="Mars">Mars</option>
            <option value="Mondelez International">Mondelez International</option>
            <option value="Nestlé">Nestlé</option>
            <option value="Storck">Storck</option>
            <option value="Toblerone">Toblerone</option>
            <option value="Wrigley's">Wrigley's</option>
          </select>
        </div>

        <div className="row my-4">
          {filteredData.map((item) => (
            <div key={item.id} className="col-6 col-lg-3 mb-5">
              {<ShopItem item={item} updateCart={cart.setCartItems} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

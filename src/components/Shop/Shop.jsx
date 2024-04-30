import React, { useEffect, useState } from 'react';
import ShopItem from './ShopItem';
import Slideshow from './Slideshow';
import axios from 'axios';
import dummy from '../../data/dummy.json';
import { CartContext } from '../../App';
import { useContext } from 'react';

const Shop = () => {
  const cart = useContext(CartContext);

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setData(dummy);
    // getData();
  }, []);

  const getData = async () => {
    // Klar til at skulle have et endpoint til data - indkommenter linje 17 og udkommenter linje 16
    const response = await axios.get('');
    setData(response.data);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <div>
      <Slideshow />
      <div className="container">
        <h1 className="mt-5 Cronus-font">Shoppen</h1>

        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleCategoryChange}
        >
          <option value="">Filtre efter kategori</option>
          <option value="Chokolade">Chokolade</option>
          <option value="Vingummi">Vingummi</option>
          <option value="Slik">Slik</option>
        </select>
        <div className="row my-5">
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

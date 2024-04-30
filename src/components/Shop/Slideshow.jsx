import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Candy from '../../assets/img/candy.jpg';
import Candy1 from '../../assets/img/candy1.jpg';
import './Shop.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      interval={12000}
      className="mt-5"
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <Image className="slideshowImg" fluid src={Candy} />
      </Carousel.Item>
      <Carousel.Item>
        <Image className="slideshowImg" fluid src={Candy1} />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;

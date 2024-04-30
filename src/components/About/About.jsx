import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './About.css';
import Image from 'react-bootstrap/Image';
import Bars from '../../assets/img/bar.jpg';

const About = () => {
  return (
    <div className="content">
      <div className="info">
        <h1 className="Cronus-font">Om Snolder</h1>
        <p>
          Vores slik er håndplukkede smagsoplevelser, der bringer den perfekte
          balance mellem sødme, knas og ren nydelse.
          <br />
          <br />
          Fra den intense chokolade til det sprøde lakrids, tager vores udvalg
          af slik dig med på en uimodståelig smagsrejse gennem den søde verden
          af konfekture.
          <br />
          <br />
          Vores slik er ikke blot en snack, det er en livsstil - en invitation
          til at forkæle dig selv med de små glæder i hverdagen og dele den rene
          lækkerhed med dem omkring dig.
        </p>
        <Link to="/shop">
          <Button variant="primary" className="btn">
            KØB SLIK
          </Button>
        </Link>
      </div>
      <div>
        <Image className='barsImg' src={Bars}></Image>
      </div>
    </div>
  );
};

export default About;

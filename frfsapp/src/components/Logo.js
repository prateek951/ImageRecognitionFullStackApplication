import React from 'react';
import Tilt from 'react-tilt';
import ml from './Logo.png';
import "./Logo.css";

const Logo = () => {

    return (<div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 250, width: 250 }}>
          <div className="Tilt-inner">
          <img src={ml} alt="Machine Learning Face Recognition"/>
          </div>
        </Tilt>
      </div>);
}
export default Logo;

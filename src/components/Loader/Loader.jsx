import React from 'react';
import './Loader.css';

const Loader = ({ borderColor = '#FF3D00', size = '16px' }) => {
  return (
    <span
      className="loader"
      style={{ borderColor: `${borderColor}`, height: size, width: size }}></span>
  );
};

export default Loader;

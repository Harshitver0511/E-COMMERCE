import React, { useState } from 'react';
import './Header.css';
import {FaSearch, FaShoppingCart, FaUser} from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`menu-btn ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        <div className="menu-btn__burger"></div>
      </div>
      <div className={`overlay ${isOpen ? 'open' : ''}`}>
        <div className="overlay-content">
          <div className="brand">
            <h1>ECOMMERCE.</h1>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/products">Product</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
          </nav>
          <div className="icons">
            <a href="/search"><FaSearch/></a>
            <a href="/cart"><FaShoppingCart/></a>
            <a href="/login"><FaUser/></a>
          </div>
        </div>
      </div>
    </div>

  )
}

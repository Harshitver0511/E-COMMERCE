
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from "@mui/material/Rating";
import './Home.css';
import im from "./c.jpg"
import { FaRupeeSign } from "react-icons/fa";
const ProductCard = ({ product }) => {
  if (!product) {
    return null; // or some fallback UI
  }

  const { _id, name, price, images, ratings, numReviews } = product;

  // Ensuring image array and its first element are present
  const imageUrl = images && images.length ? images[0].url : im;

  const options = {
    readOnly: true,
        precision: 0.5,
    value: ratings || 0,
   
    
  };

  return (
    <Link className='productcard' to={`/product/${_id}`}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <div>
        <Rating {...options} />
        <span className='productcardspan'>({numReviews || 0} Reviews)</span>
      </div>
      <span>{FaRupeeSign}</span><span>{`${price}`}</span>
    </Link>
  );
};

export default ProductCard;

// import React from 'react'
// import {Link} from 'react-router-dom'
// import ReactStars from "react-rating-stars-component";
// import './Home.css'

// const option = {
//     edit:false,
//     color:"rgba(20,20,20,.1)",
//     activeColor:"tomato",
//     value:2.5,
//     isHalf:true,
//     size:window.innerWidth<600?20:25,


// }
// function Product({product}) {
//     if (!product) {
//         return null; // or some fallback UI
//       }
//   return (
//       <>
//       <Link className='productcard' to={product._id}>
//             <img src={product.image[0].url} alt={product.name} />
//             <p>{product.name}</p>
//             <div>
//                 <ReactStars {...option}/>
//                 <span>(256 Reviews)</span>

//             </div>
//             <span>{product.price}</span>
//             <p>hii</p>

//       </Link>
//       </>
//   )
// }

// export default Product
import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import './Home.css';
import im from "./c.jpg"
const Product = ({ product }) => {
  if (!product) {
    return null; // or some fallback UI
  }

  const { _id, name, price, image, rating, numReviews } = product;

  // Ensuring image array and its first element are present
  const imageUrl = image && image[0] && image[0].url ? image[0].url : 'placeholder_image_url'; // Add a placeholder image URL

  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    value: rating || 0,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Link className='productcard' to={`/product/${_id}`}>
      <img src={im} alt={name} />
      <p>{name}</p>
      <div>
        <ReactStars {...options} />
        <span>({numReviews || 0} Reviews)</span>
      </div>
      <span>${price}</span>
    </Link>
  );
};

export default Product;

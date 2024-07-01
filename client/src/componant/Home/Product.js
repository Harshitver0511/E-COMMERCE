import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import './Home.css'

const option = {
    edit:false,
    color:"rgba(20,20,20,.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size:window.innerWidth<600?20:25,


}
function Product({product}) {
  return (
      <>
      <Link className='productcard' to={product._id}>
            <img src={product.image[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...option}/>
                <span>(256 Reviews)</span>

            </div>
            <span>{product.price}</span>
            <p>hii</p>

      </Link>
      </>
  )
}

export default Product
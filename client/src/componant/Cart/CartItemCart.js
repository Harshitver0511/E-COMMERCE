
import React from "react";
import './CartItemCart.css';
import { Link } from "react-router-dom";
function CartItemCart({item,deleteCartitems}) {
  return (
    <>
     <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={()=>deleteCartitems(item.product
        )}>Remove</p>
      </div>
    </div>

    </>
  )
}

export default CartItemCart
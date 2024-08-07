import React from 'react'
import './Cart.css'
import CartItemCart from './CartItemCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart,removeItemFromCart } from '../../action/cartAction'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


function Cart() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
      const deleteCartitems=(id)=>{
        dispatch(removeItemFromCart(id));
      }

      const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
      };
      if(cartItems.length===0){
        return (
          <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
        )
      }
  return (
    <>  
    <div className='cartPage'>
        <div className='cartHeader'>
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
        {cartItems.map(item => (<>
            <div className="cartContainer" key={item.product}>
            <CartItemCart key={item.product} item={item} deleteCartitems={deleteCartitems
            }  />
            <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <p id='inp'>{item.quantity}</p>
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>

                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
            </div>

                  </>
        ))}
        <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
    </div>
    </>
  )
}

export default Cart
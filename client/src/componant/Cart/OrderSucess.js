import React from 'react'
import './OrderSucess.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function OrderSucess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/me">View Orders</Link>
    </div>
  )
}

export default OrderSucess
// src/components/Cart/StripeWrapper.js

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const StripeWrapper = ({ stripeApiKey }) => {
  const stripePromise = loadStripe(stripeApiKey);

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default StripeWrapper;

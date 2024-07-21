import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../action/productAction';
import Loader from '../layout/Loader/Loader';
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getProducts());
  }, [dispatch]);

  const { product: products = [], loading = true, error } = useSelector((state) => state.product);

  useEffect(() => {
    // console.log('Products state:', products);
    // console.log('Loading:', loading);
    // console.log('Error:', error);
  }, [products, loading, error]);

  return (
    <>
      <MetaData title={'ECOMMERCE'} />
      <div className="banner">
        <p>Welcome to ECOMMERCE</p>
        <h1>Shop with us</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className='homeHeading'> Feature Product </h2>
      <div className="container" id="container">
        {loading ? (
          <Loader/>
        ) : error ? (
          toast.error(error)
        ) : (
          products.length > 0 ? (
            products.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))
          ) : (
            <p>No products found</p>
          )
        )}
      </div>
    </>
  );
};

export default Home;

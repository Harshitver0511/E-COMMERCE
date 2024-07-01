import React from 'react'
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import im from './c.jpg'
import MetaData from '../layout/MetaData';
import { getProducts } from '../../action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const product={
    name: 'Product Name',
    price: 100,
    image:[{url:im}],
    _id:"harshit",

};

function Home() {
 
  const dispatch = useDispatch();
  useEffect(() => {dispatch(getProducts())},[dispatch]);
  const product = useSelector(state => state.products.product);
  console.log(product);
  return (
    <>
    <MetaData title={'ECOMMERCE'}/>
    <div className="banner">

        <p>Welcome to ECOMMERCE</p>
        <h1>Shop with us</h1>
        <a href="#container">
            <button>Scroll <CgMouse/></button>
        </a>
    </div>
    <h2 className='homeHeading'> Feature Product </h2>

    <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      
        
        
    </div>

    </>
  )
}

export default Home
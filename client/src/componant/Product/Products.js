import React, { useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../action/productAction";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Mobile",
  "Footwear",
  "Tops",
  "Bottom",
  "SmartPhones",
  "Attire",
];
function Products() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);

  const { loading, product, error, productCount, resultperPage } = useSelector(
    (state) => state.product
  );
  const { keyword } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  if (loading) {
    return <Loader />;
  }
  // console.log(productCount)
  return (
    <>
      <MetaData title="Product -- Ecommerce" />
      <h2 className="productsHeading"> Products</h2>
      <div className="products">
        {product &&
          product.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
      <ul className="categoryBox">
        <Typography>Categories</Typography>
        {categories.map((cat) => (
          <li
            className="category-link"
            key={cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
      <fieldset>
        <Typography component="legend">Ratings Above</Typography>
        <Slider
        value={ratings}
        onChange={(e,newRating)=>setRating(newRating)}
        aria-labelledby="continuous-slider"
        min={0}
        max={5}
        valueLabelDisplay="auto"
        />
      </fieldset>
      </div>
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultperPage}
          totalItemsCount={productCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </>
  );
}

export default Products;

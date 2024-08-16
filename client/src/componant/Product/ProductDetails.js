import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { clearErrors, getProductDetail,newReview } from "../../action/productAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./ReviewCard";
import "./productdetail.css";
import Loader from "../layout/Loader/Loader"
import {toast} from "react-toastify";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../action/cartAction";
import { Dialog,
  DialogActions 
,DialogContent,
DialogTitle,
Rating,
Button,} from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { harshit, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );


  const option = {
    
    value: harshit.ratings
    ,readOnly: true,
    precision: 0.5,
    size: "large",
  
    
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
 
  const increaseQuantity = () => {
    if (harshit.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addItemshandle = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to cart");
  }
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  React.useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors())
    }
    if(reviewError){
      toast.error(reviewError);
      dispatch(clearErrors())
    }
    if(success){
      toast.success("Review submitted successfully");
    dispatch({type:"NEW_REVIEW_RESET"})
    }
    dispatch(getProductDetail(id));
  }, [dispatch,error,reviewError,success, id]);


  const settings = {
    
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
     toast.error(error);
     dispatch(clearErrors())

  }

  return (
    <>
    <MetaData title={`${harshit.name}--Ecommerce`} />
      <div className="ProductDetails">
        <div className="hii">
          {harshit.images && (
            <Slider {...settings}>
              {harshit.images.map((img) => (
                <div key={img.public_id}>
                  <img className="has" src={img.url} alt={harshit.title} />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="detail">
          <div className="detailsBlock-1">
            <h2>{harshit.name}</h2>
            <p>Product {harshit._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...option} />
            <span className="ratingspan">({harshit.numReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${harshit.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                {/* <input type="number" value={harshit.stock} /> */}
                <p>{quantity}</p>   
                <button onClick={increaseQuantity} >+</button>
              </div>{""}
                <button disabled={harshit.stock<1?true:false} onClick={addItemshandle}>Add to Cart</button>
            </div>
            <p>
                Status:{""}
                <b className={harshit.stock < 1 ? "redColor" : "greenColor"}>
                    {harshit.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
            </p>
          </div>
            <div className="detailsBlock-4">
                Description:
                <p>{harshit.description}</p>
            </div>
            <button onClick={submitReviewToggle} className="submitReview"> Submit Review</button>

        </div>
      </div>
      <h3 className="reviewsHeading"> REVIEWS</h3>
      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      {harshit.reviews && harshit.reviews[0] ?(
        <div className="reviews">
          {harshit.reviews && harshit.reviews.map((review) => 
            
          <ReviewCard key={review._id} review={review} />
           
          )}
          </div>

      ) : (
        <p className="noReviews">No Reviews</p>
      )}
    </>
  );
}

export default ProductDetails;

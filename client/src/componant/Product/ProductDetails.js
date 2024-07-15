import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import "./productdetail.css";
import ReactStar from "react-rating-stars-component";
import Slider from "react-slick";
import { getProductDetail } from "../../action/productAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./ReviewCard";
import "./productdetail.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { harshit, loading, error } = useSelector(
    (state) => state.productDetail
  );

  React.useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  const option = {
    size: 19,
    value: harshit.ratings,
    readOnly: true,
    precision: 0.5,
    edit: false,
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



  const settings = {
    
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
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
            <ReactStar {...option} />
            <span>({harshit.numReviews} Reviews)</span>
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
                <button>Add to Cart</button>
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
            <button className="submitReview"> Submit Review</button>

        </div>
      </div>
      <h3 className="reviewsHeading"> REVIEWS</h3>
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

import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
    clearErrors,
    getAllReviews,
    deleteReviews,
  } from "../../action/productAction";
  import { Button } from '@mui/material';
  import MetaData from '../layout/MetaData';
  import Sidebar from './SideBar';
  import { DELETE_REVIEW_RESET } from '../../constant/productConstant';
  import Star from '@mui/icons-material/Star';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { DataGrid } from '@mui/x-data-grid';
  import { useNavigate } from 'react-router-dom';
  import './ProductReviews.css'
function ProductReviews() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.review
    );
  
    const { error, reviews, loading } = useSelector(
      (state) => state.productReviews
    );
  
    const [productId, setProductId] = useState("");
  
    const deleteReviewHandler = (reviewId) => {
      dispatch(deleteReviews(reviewId, productId));
    }    
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
      };
    
      useEffect(() => {
        if (productId.length === 24) {
          dispatch(getAllReviews(productId));
        }
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          toast.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          toast.success("Review Deleted Successfully");
          navigate("/admin/reviews");
          dispatch({ type: DELETE_REVIEW_RESET });
        }
      }, [dispatch, error, deleteError, navigate, isDeleted, productId]);
      const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
    
          cellClassName: (params) => {
            return (params.row.id, "rating") >= 3
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button
                  onClick={() =>
                    deleteReviewHandler(params.row.id, "id")
                  }
                >
                  <DeleteIcon />
                </Button>
              </>
            );
          },
        },
      ];
      const rows = [];

      reviews &&
        reviews.forEach((item) => {
          rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
          });
        });

  return (
    <>
     <MetaData title={`ALL REVIEWS - Admin`} />

<div className="dashboard">
  <Sidebar/>
  <div className="productReviewsContainer">
    <form
      className="productReviewsForm"
      onSubmit={productReviewsSubmitHandler}
    >
      <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

      <div>
        <Star />
        <input
          type="text"
          placeholder="Product Id"
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>

      <Button
        id="createProductBtn"
        type="submit"
        disabled={
          loading ? true : false || productId === "" ? true : false
        }
      >
        Search
      </Button>
    </form>

    {reviews && reviews.length > 0 ? (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    ) : (
      <h1 className="productReviewsFormHeading">No Reviews Found</h1>
    )}
  </div>
</div>
    </>
  )
}

export default ProductReviews
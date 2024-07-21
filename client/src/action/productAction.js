import axios from 'axios';
import {
     ALL_PRODUCT_FAIL,
     ALL_PRODUCT_REQUEST,
     ALL_PRODUCT_SUCCESS,
     CLEAR_ERRORS ,
     PRODUCT_DETAILS_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS
        } from "../constant/productConstant";
    
  export const getProducts = (keyword = " ",currentPage=1,price=[0,25000],category,ratings=0)=> async (dispatch) =>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        let link = `/api/v1/product?ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&keyword=${keyword}`;
        if(category){
            link = `/api/v1/product?ratings[gte]=${ratings}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&keyword=${keyword}`;
        }
        const {data} = await axios.get(link);
        // console.log(data);
    
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
  }

  export const getProductDetail = (id)=> async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log(data);
    
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        });
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
  }

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}  

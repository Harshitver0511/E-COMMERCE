
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS } from "../constant/productConstant";



const initialState = {
    loading: true,
    product: [],
    error: null,

  };


const productReducer = (state =initialState, action) => {
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload.product,
                loading: false,
                productCount: action.payload.productCount,
            }
        case ALL_PRODUCT_FAIL:
            return {
                ...state,   
                error: action.payload,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
 
};
export default productReducer;
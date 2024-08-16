import React from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,getAdminProduct , deleteProduct , updateProduct} from '../../action/productAction'
import {toast} from 'react-toastify'
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar'
import './ProductList.css'



function ProductList() {
  const dispatch = useDispatch();
  const {error,product} = useSelector(state => state.product);
  const {error:deleterror,isDeleted}=useSelector(state=>state.products)
  React.useEffect(() => {
    dispatch(getAdminProduct());
    if(error){
      toast.error(error);
      dispatch(clearErrors())
    }
    if(deleterror){
      toast.error(deleterror);
    }
    if(isDeleted){
      toast.success("product deleted successfully");
    }
  },[dispatch,error ,deleterror,isDeleted])
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAdminProduct());
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link  to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>
      
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
      
    },
  ];

  const rows = [];
  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
    <MetaData title={`ALL PRODUCTS - Admin`} />

<div className="dashboard">
  <SideBar />
  <div className="productListContainer">
    <h1 id="productListHeading">ALL PRODUCTS</h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
</>
  )
}

export default ProductList
import React from 'react'
import { useEffect
 } from 'react'
import { useSelector ,useDispatch   } from 'react-redux'
import './MyOrder.css'
import { clearErrors,myOrders } from '../../action/orderAction'
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import { DataGrid } from '@mui/x-data-grid';
import Footer from '../layout/Footer/Footer'
function MyOrder() {
    const dispatch = useDispatch();

  
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
      console.log(orders)
    const column = [
        { field: 'id', headerName: 'Order ID', minWidth: 300,flex:1},
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
          },
        {
            field:"itemsQty"
            ,headerName:'Items Quantity'
            ,type:'number'
            ,minWidth:150
            ,flex:0.5
        },
        {
            
            field:"amount",
            headerName:'Amount',
            type:'number'
            ,minWidth:270
            ,flex:0.5
        },{
            field:"actions",
            headerName:'Actions',
            minWidth:150,
            flex:0.5,
            type:'number',
            renderCell:(params) => {
                return (
                    <div>
                        <Link to={`/order/${params.row.id}`}>
                            <LaunchIcon className="launchIcon" />
                        </Link>
                    </div>
                )
            }

        }

    ];
    const row = [];
    orders && orders.forEach(order => {
        row.push({
            id:order._id,
            status:order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'Delivered' : 'Processing',
            itemsQty:order.orderitems.length,
            amount:order.totalPrice,
            actions:order
        })
    });   
    
    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(myOrders());
      }, [dispatch, , error]);
    if (loading) return <Loader />;
  return (
    <>
    <MetaData title={`${user.name}- order`} />
    <div className="myOrdersPage">
          <DataGrid
            rows={row}
            columns={column}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />


          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>

    </>
  )
}

export default MyOrder
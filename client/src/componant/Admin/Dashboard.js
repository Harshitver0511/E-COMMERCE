import React from 'react';
import './Dashboard.css';
import SideBar from './SideBar';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { getAdminProduct ,clearErrors } from '../../action/productAction';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Doughnut, Line } from 'react-chartjs-2';
import {getAllOrders} from '../../action/orderAction';
import { getAllUsers } from "../../action/userAction.js";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register the components
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Dashboard() {
    const dispatch = useDispatch();
  const {product} = useSelector(state => state.product);
    const {orders} = useSelector(state => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

  React.useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  },[dispatch])
  let outOfStock = 0;
    product && product.forEach((product) => {
        if (product.stock === 0) {
            outOfStock += 1;    
        }
    });
    let totalAmount = 0;
    orders && orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock,product.length - outOfStock],
        },
      ],
    };

    return (
        <>
            <div className="dashboard">
                <SideBar />
                <MetaData title="Dashboard - Admin Panel" />
                <div className="dashboardContainer">
                    <Typography component="h1">Dashboard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount:<br />{totalAmount}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{product && product.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>
                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

import React, { useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { logout } from '../../../action/userAction';
import { useDispatch ,useSelector} from 'react-redux';





function UserOptions({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems} = useSelector(state => state.cart);
    const [open, setOpen] = useState(false);
    const dashboard=()=>{
        navigate("/admin/dashboard")
    }
    const account=()=>{
        navigate("/account")
    }
    const orders=()=>{
        navigate("/orders/me")
    }
    const logoutUser=()=>{
        toast.success("Logged out successfully")
        dispatch(logout())
        navigate("/login")
        
    }
   
   const option=[
    {icon:<PersonIcon/>,name:"Profile",fun:account},
    {icon:<ListAltIcon/>,name:"Orders",fun:orders},
    {icon:<ShoppingCartIcon style={{color:cartItems.length>0?'tomato':'unset'}} />,name:`Cart(${cartItems.length})`,fun:()=>navigate("/cart")},
    {icon:<ExitToAppIcon/>,name:"Logout",fun:logoutUser}
   ]
   if(user.role==="Admin"){
    option.unshift({icon:<DashboardIcon/>,name:"Dashboard",fun:dashboard})
   }
   
    


    return (
        <>
        <Backdrop open={open}  style={{zIndex:10}}/>
            <SpeedDial 
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                className='speedDial'
                onOpen={() => setOpen(true)}
                open={open}
                style={{zIndex:"10"}}
                direction="down"
                icon={
                    <img 
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/logo512.png"}
                        alt={user && user.name} 
                    />
                }
            >
            {option.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.fun}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}

            </SpeedDial>
        </>
    );
}

export default UserOptions;

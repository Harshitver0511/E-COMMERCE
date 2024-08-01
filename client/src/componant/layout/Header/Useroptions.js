import React, { useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { logout } from '../../../action/userAction';
import { useDispatch } from 'react-redux';





function UserOptions({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dashboard=()=>{
        navigate("/dashboard")
    }
    const account=()=>{
        navigate("/account")
    }
    const orders=()=>{
        navigate("/orders")
    }
    const logoutUser=()=>{
        toast.success("Logged out successfully")
        dispatch(logout())
        navigate("/")
        
    }
   
   const option=[
    {icon:<PersonIcon/>,name:"Profile",fun:account},
    {icon:<ListAltIcon/>,name:"Orders",fun:orders},
    {icon:<ExitToAppIcon/>,name:"Logout",fun:logoutUser}
   ]
   if(user.role==="Admin"){
    option.unshift({icon:<DashboardIcon/>,name:"Dashboard",fun:dashboard})
   }
   
    


    return (
        <>
        <Backdrop open={open}  style={{zIndex:0}}/>
            <SpeedDial 
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                className='speedDial'
                onOpen={() => setOpen(true)}
                open={open}
                style={{zIndex:"0"}}
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
                />
            ))}

            </SpeedDial>
        </>
    );
}

export default UserOptions;

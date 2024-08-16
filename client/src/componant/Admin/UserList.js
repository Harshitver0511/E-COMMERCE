import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar'
import './ProductList.css'
import { deleteUser,getAllUsers,clearErrors } from '../../action/userAction';
import { DELETE_USER_RESET } from '../../constant/userConstant';
import { useNavigate } from 'react-router-dom';
function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users ,error } = useSelector(state => state.allUsers);
    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);
    
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          toast.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          toast.success(message);
          navigate("/admin/users");
          dispatch({ type: DELETE_USER_RESET });
        }
    
        dispatch(getAllUsers());
      }, [dispatch, error, deleteError, navigate, isDeleted, message]);
    
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return (params.row.id, "role") === "admin"
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
                <Link to={`/admin/user/${params.row.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.row.id)
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
    
      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
          });
        });
  return (
    <>
    <MetaData title={`ALL USERS - Admin`} />

<div className="dashboard">
  <SideBar />
  <div className="productListContainer">
    <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList
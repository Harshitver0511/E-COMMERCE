import React from 'react'
import './UpdatePassword.css'
import { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../action/userAction'
import { useNavigate } from "react-router-dom";
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../constant/userConstant'
import { toast } from 'react-toastify'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


function UpdatePassword() {
    const dispatch = useDispatch()
    const navigate= useNavigate();
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldpassword", oldpassword);
        myForm.set("newpassword", newpassword);
        myForm.set("confirmpassword", confirmpassword);
    
        dispatch(updatePassword(myForm));
      };
      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          toast.success("Profile Updated Successfully");
    
         navigate('/account')
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
      }, [dispatch, error, toast, navigate, isUpdated]);
      if(loading){
        return <Loader/>
      }

  return (
    <>
    <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default UpdatePassword
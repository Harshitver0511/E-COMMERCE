import React from 'react'
import './ResetPassword.css'
import { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../action/userAction'
import { useNavigate } from "react-router-dom";
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useParams } from 'react-router-dom'

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params=useParams();
    const {token}=params;
    const { loading, error, success } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmpassword", confirmpassword);
    
        dispatch(resetPassword(token, myForm));
      };

      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
         
          toast.success("Password updated successfully");
          navigate("/login");
        }
      },[dispatch,error,success,navigate])

      if(loading){
        return <Loader />
      }
  return (
    <>
    <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default ResetPassword
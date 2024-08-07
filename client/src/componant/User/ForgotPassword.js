import React from 'react'
import './ForgotPassword.css'
import { useDispatch,useSelector } from 'react-redux'
import { forgotPassword ,clearErrors } from '../../action/userAction'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { useState ,useEffect   } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ForgotPassword() {
    const dispatch = useDispatch();
    const {loading,error,message} = useSelector(state => state.forgotPassword);
    const [email, setEmail] = useState('');
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email',email);
        dispatch(forgotPassword(formData));
    }
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message){
            toast.success(message);
        }
    }, [dispatch,error,message])
    if(loading){
        return <Loader />
    }

  return (
    <>
     <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default ForgotPassword
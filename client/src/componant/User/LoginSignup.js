import React from "react";
import "./LoginSignup.css";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useRef, useState ,useEffect} from "react";
import{useDispatch,useSelector} from "react-redux";
import { clearErrors,login,register} from "../../action/userAction";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


function LoginSignup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error,loading,isAuthenticated,user} = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [users, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const { name, email, password } = users;
    const [avatar, setAvatar] = useState("/logo512.png");
    const [avatarPreview, setAvatarPreview] = useState("/logo512.png");
     

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...users, [e.target.name]: e.target.value });
    }
  }
  const redir = window.location.search ? window.location.search.split('=')[1] : '/account';

    useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      navigate(redir);
    }

   },[error,dispatch,isAuthenticated,navigate,redir]);
   if(loading){
    return <Loader/>
  }


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          } 
      }
   


  return (

    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                required
                onChange={(e) => setLoginEmail(e.target.value)}
            
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                required
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot" className="forgotPassword">Forget Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    name="name"
                    
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default LoginSignup;

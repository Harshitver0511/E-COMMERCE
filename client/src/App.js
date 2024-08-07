
import React from 'react';
import './App.css'; 
import Header from './componant/layout/Header/Header';
import Footer from './componant/layout/Footer/Footer';
import Home from './componant/Home/Home';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import ProductDetails from './componant/Product/ProductDetails';
import Products from './componant/Product/Products';
import Search from './componant/Product/Search';
import LoginSignup from './componant/User/LoginSignup';
import store from './store';
import { loadUser } from './action/userAction';
import Useroptions from './componant/layout/Header/Useroptions';
import { useSelector } from 'react-redux';
import Profile from './componant/User/Profile';
import UpdateProfile from './componant/User/UpdateProfile';
import UpdatePassword from './componant/User/UpdatePassword';
import ForgotPassword from './componant/User/ForgotPassword';
import ProtectedRoute from './componant/Route/ProtectedRoute';
import ResetPassword from './componant/User/ResetPassword';
import Cart from './componant/Cart/Cart';
import Shipping from './componant/Cart/Shipping';
import ConfirmOrder from './componant/Cart/ConfirmOrder';
import Payment from './componant/Cart/Payment';
import axios from 'axios';
function App() {
  const {isAuthenticated,user} = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = React.useState('');
  async function getStripeApiKey() {
    const {data} = await axios.get('/api/v1/stripeapi');
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();


  }, []);
  return (
   <>
    <Router>
      <Header/>
      {isAuthenticated && <Useroptions user={user} />}
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:keyword' element={<Products/>} />
        <Route path='/search/' element={<Search/>} />
        <Route path='/login' element={<LoginSignup/>} />
        <Route element={<ProtectedRoute />}>
          <Route path='/account' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/me/update' element={<UpdateProfile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/password/update' element={<UpdatePassword />} />
          </Route>
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route element={<ProtectedRoute />}>
            <Route path='/shipping' element={<Shipping/>} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/order/confirm' element={<ConfirmOrder/>} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/process/payment' element={<Payment/>} />
          </Route>
          
      </Routes>
      <Footer/>
     </Router>
   </>
  );
}

export default App;


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
import StripeWrapper from './componant/Cart/StripeWrapper';
import OrderSucess from './componant/Cart/OrderSucess';
import MyOrder from './componant/Order/MyOrder';
import OrderDetails from './componant/Order/OrderDetails';
import Dashboard from './componant/Admin/Dashboard';
import ProductList from './componant/Admin/ProductList';
import NewProduct from './componant/Admin/NewProduct';
import UpdateProduct from './componant/Admin/UpdateProduct';
import OrderList from './componant/Admin/OrderList';
import ProcessOrder from './componant/Admin/ProcessOrder';
import UserList from './componant/Admin/UserList';
import Updateuser from './componant/Admin/Updateuser';
import ProductReviews from './componant/Admin/ProductReviews';
import NotFound from './componant/layout/Not Found/Notfound';
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
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })
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
          
          {stripeApiKey && (
            <Route element={<ProtectedRoute />}>
              <Route path='/process/payment' element={<StripeWrapper stripeApiKey={stripeApiKey} />} />
            </Route>
          )}
           <Route element={<ProtectedRoute />}>
            <Route path='/success' element={<OrderSucess/>} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/orders/me' element={<MyOrder/>} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/order/:id' element={<OrderDetails/>} />
          </Route>
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/dashboard' element={<Dashboard/>} />
            </Route>

          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/products' element={<ProductList/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/product' element={<NewProduct/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/product/:id' element={<UpdateProduct/>} />
            </Route>
          )}
           {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/orders' element={<OrderList/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/order/:id' element={<ProcessOrder/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/users' element={<UserList/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/user/:id' element={<Updateuser/>} />
            </Route>
          )}
          {user && user.role === 'Admin' &&(
            <Route element={<ProtectedRoute  />}>
              <Route path='/admin/reviews' element={<ProductReviews/>} />
            </Route>
          )}
          <Route path='*' element={<NotFound/>} />
          
      </Routes>
      <Footer/>
     </Router>
   </>
  );
}

export default App;

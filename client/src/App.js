
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
import ProtectedRoute from './componant/Route/ProtectedRoute';
function App() {
  const {isAuthenticated,user} = useSelector(state => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
    store.dispatch(loadUser());


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
      </Routes>
      <Footer/>
     </Router>
   </>
  );
}

export default App;


import React from 'react';
import './App.css'; 
import Header from './componant/layout/Header/Header';
import Footer from './componant/layout/Footer/Footer';
import Home from './componant/Home/Home';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import ProductDetails from './componant/Product/ProductDetails';

function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
  }, []);
  return (
   <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails/>} />
      
      </Routes>
      <Footer/>
     </Router>
   </>
  );
}

export default App;

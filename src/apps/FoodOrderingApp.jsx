// import {useState, useEffect} from 'react';
// import classes from './FoodOrderingApp.module.css';
import Header from '../components/FoodOrderingApp/Layout/Header';
import Meals from '../components/FoodOrderingApp/Meals/Meals';
import Cart from '../components/FoodOrderingApp/Cart/Cart';
import { useState } from 'react';
import CartProvider from '../store/CartProvider';
const FoodOrderingApp = (props) => {

   const [cartIsShown, setCartIsShown]= useState(false);

   const showCartHandler = ()=>{
      setCartIsShown(true);
   }

   const hideCartHandler = ()=>{
      setCartIsShown(false);
   }
     return (
         <CartProvider>
         {cartIsShown && <Cart onClose={hideCartHandler}/>}
         <Header onShowCart={showCartHandler}/>
         <main>
            <Meals/>
         </main>
         </CartProvider>
     );
        }


export default FoodOrderingApp;
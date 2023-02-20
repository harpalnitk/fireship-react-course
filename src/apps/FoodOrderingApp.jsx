// import {useState, useEffect} from 'react';
// import classes from './FoodOrderingApp.module.css';
import Header from '../components/FoodOrderingApp/Layout/Header';
import Meals from '../components/FoodOrderingApp/Meals/Meals';
import Cart from '../components/FoodOrderingApp/Cart/Cart';
import { useState } from 'react';
const FoodOrderingApp = (props) => {

   const [cartIsShown, setCartIsShown]= useState(false);

   const showCartHandler = ()=>{
      setCartIsShown(true);
   }

   const hideCartHandler = ()=>{
      setCartIsShown(false);
   }
     return (
         <>
         {cartIsShown && <Cart onClose={hideCartHandler}/>}
         <Header onShowCart={showCartHandler}/>
         <main>
            <Meals/>
         </main>
         </>
     );
        }


export default FoodOrderingApp;
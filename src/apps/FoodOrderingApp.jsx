import {useState, useEffect} from 'react';
import classes from './FoodOrderingApp.module.css';
import Header from '../components/FoodOrderingApp/Layout/Header';
import Meals from '../components/FoodOrderingApp/Meals/Meals';
const FoodOrderingApp = (props) => {
     return (
         <>
         <Header/>
         <main>
            <Meals/>
         </main>
         </>
     );
        }


export default FoodOrderingApp;
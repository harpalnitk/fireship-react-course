import {useState, useEffect} from 'react';
import  classes from './Header.module.css';

import mealsImage from '../../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
     return (
         <>
         <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
         </header>
         <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full of deliciious food!!" />
         </div>
         </>
     );
        }


export default Header;
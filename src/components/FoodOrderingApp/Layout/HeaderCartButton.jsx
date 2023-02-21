import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);


  const {items} = cartCtx;

  //we want to show in the badge all cart
  //item numbers; if a cart item has 3 qty then it will be counted
  //as 3 separate item
  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);


// cart total button will blink whenever item is added or removed
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if(cartCtx.items.length === 0){
        return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(()=>{
        setBtnIsHighlighted(false);
        //animation plays for 300ms in css file
    },300);

    //cleanup

    return ()=>{
       clearTimeout(timer); 
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

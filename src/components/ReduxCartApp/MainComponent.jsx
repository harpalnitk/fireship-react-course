import Cart from './Cart/Cart';
import Layout from './Layout/Layout';
import Products from './Shop/Products';
import './MainComponent.module.css';
import { useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Notification from './UI/Notification';
import { sendCartData, fetchCartData } from '../../store/redux-cart-app-actions';

//this will be initialized only once when the app loads
let isInitial = true;

function MainComponent() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchCartData());
},[dispatch])


  useEffect(() => {
if(isInitial){
  isInitial = false;
  return;
}
// we don't want to send cart data on first app upload
if(cart.changed){
  dispatch(sendCartData(cart));
}
  }, [cart, dispatch]);

  return (
    <>
    {notification && <Notification
    status= {notification.status}
    title={notification.title}
    message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default MainComponent;

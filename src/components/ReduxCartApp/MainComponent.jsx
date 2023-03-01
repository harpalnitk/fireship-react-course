import Cart from './Cart/Cart';
import Layout from './Layout/Layout';
import Products from './Shop/Products';
import './MainComponent.module.css';
import { useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { uiSliceActions } from '../../store/redux-cart-app-ui';
import Notification from './UI/Notification';

//this will be initialized only once when the app loads
let isInitial = true;

function MainComponent() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {

    const sendCartData = async ()=>{
      dispatch(uiSliceActions.showNotification({
        status: 'pending',
        title:'Sending...',
        message: 'Sending Cart data!'
      }));
      const res = await fetch(
        `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/cart.json`,
        {
          //new data will override existing data with PUT
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if(!res.ok){
        throw new Error('Sending Cart data failed!');
        // dispatch(uiSliceActions.showNotification({
        //   status: 'error',
        //   title:'Error...',
        //   message: 'An error occured while sending cart data!!'
        // }));
      }
     // const resData = await res.json();

      dispatch(uiSliceActions.showNotification({
        status: 'success',
        title:'Success...',
        message: 'Sent Cart data successfully!'
      }));
    }

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch(error=>{
      dispatch(uiSliceActions.showNotification({
        status: 'error',
        title:'Error...',
        message: 'An error occured while sending cart data!!'
      }));
    });
//react-redux will ensure that dispatch function never changes
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

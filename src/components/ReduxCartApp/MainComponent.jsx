import Cart from './Cart/Cart';
import Layout from './Layout/Layout';
import Products from './Shop/Products';
import './MainComponent.module.css';

import { useSelector } from 'react-redux';

function MainComponent() {
 
  const showCart = useSelector(state=> state.ui.cartIsVisible);

  return (
   <>
       <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
   
   </>


  );
}

export default MainComponent;
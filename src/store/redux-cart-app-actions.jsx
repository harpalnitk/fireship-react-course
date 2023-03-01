import { uiSliceActions } from "./redux-cart-app-ui";
import { cartActions } from "./redux-cart-app-cart";




//! THUNK ACTION CREATOR
//our own custom action creator
// this code is run before reducer
export const sendCartData = (cart)=>{
    // return {type: '', payload:''}
    //OR else we return a function which returns action
    return async (dispatch) =>{
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title:'Sending...',
            message: 'Sending Cart data!'
          }));
    
          const sendRequest = async () => {
            const res = await fetch(
                `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/cart.json`,
                {
                  //new data will override existing data with PUT
                  method: 'PUT',
                  //to remove changed variable from cart state we are creating a new cart object
                  //which is being sent to server
                  body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                }
              );
              if(!res.ok){
                throw new Error('Sending Cart data failed!');
              }
          }
    
       try {
           await sendRequest();
           dispatch(uiSliceActions.showNotification({
            status: 'success',
            title:'Success...',
            message: 'Sent Cart data successfully!'
          }));
       } catch (error) {
        dispatch(uiSliceActions.showNotification({
            status: 'error',
            title:'Error...',
            message: 'An error occured while sending cart data!!'
          }));
       }
    
    
    }
    }

    export const fetchCartData = ()=>{
        return async (dispatch)=>{
            const fetchData = async ()=>{
                const res = await fetch( `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/cart.json`);
                if(!res.ok){
                    throw new Error('Error Fetching Cart Data!!!')
                }
                return await res.json();
            }
            try {
                const cartData = await fetchData();
                //below will give error if cart data is cleared or empty in server
                //dispatch(cartActions.replaceCart(cartData))
                dispatch(cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity
                }))
            } catch (error) {
                dispatch(uiSliceActions.showNotification({
                    status: 'error',
                    title:'Error...',
                    message: 'An error occured while fetching cart data!!'
                  })); 
            }
        }
    }
    
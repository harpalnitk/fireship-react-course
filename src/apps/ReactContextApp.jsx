import { BrowserRouter } from "react-router-dom";
import MainComponent from "../components/ReactContextApp/MainComponent";
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';

//import productReducer from '../components/ReactContextApp/store/reducers/products';

//import ProductsProvider from '../components/ReactContextApp/context/products-context';


// const rootReducer = combineReducers({
//    shop: productReducer
//  });
 
//  const store = createStore(rootReducer);
import configCounterStore from "../components/ReactContextApp/hooks-store/counter-store";

import configProductStore from "../components/ReactContextApp/hooks-store/products-store";
//using our own custom hook for global state managemant
configProductStore();
configCounterStore();


const ReactContextApp = (props) => {
     return (
      // <Provider store={store}>
     // <ProductsProvider>
        <BrowserRouter>
         <MainComponent>
         </MainComponent>
        </BrowserRouter>
      //</ProductsProvider>

       //  </Provider> 

     );
        }


export default ReactContextApp;
import Counter from "../components/ReduxToggleCounter/Counter";
import {Provider} from 'react-redux';
import store from "../store/redux-toggle-counter-store";
import Header from '../components/ReduxToggleCounter/Header';
import Auth from '../components/ReduxToggleCounter/Auth' 


const ReduxToggleCounterApp = (props) => {
     return (
         <Provider store={store}>
            <Header/>
            <Auth/>
        <Counter/>
         </Provider>
     );
        }


export default ReduxToggleCounterApp;
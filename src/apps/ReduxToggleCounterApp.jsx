import Counter from "../components/ReduxToggleCounter/Counter";
import {Provider} from 'react-redux';
import store from "../store/redux-toggle-counter-store"; 


const ReduxToggleCounterApp = (props) => {
     return (
         <Provider store={store}>
        <Counter/>
         </Provider>
     );
        }


export default ReduxToggleCounterApp;
import Counter from "../components/ReduxToggleCounter/Counter";
import {Provider} from 'react-redux';
import store from "../store/redux-toggle-counter-store";
import Header from '../components/ReduxToggleCounter/Header';
import MainComponent from "../components/ReduxToggleCounter/MainComponent";


const ReduxToggleCounterApp = (props) => {


     return (
         <Provider store={store}>
            <Header/>
             <MainComponent/>
           <Counter/>
         </Provider>
     );
        }


export default ReduxToggleCounterApp;
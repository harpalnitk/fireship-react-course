import MainComponent from '../components/ReduxCartApp/MainComponent';
import {Provider} from 'react-redux';
import store from '../store/redux-cart-app';

function ReduxCartApp() {
  return (
    <Provider store={store}>
    <MainComponent/>
    </Provider>
  );
}

export default ReduxCartApp;
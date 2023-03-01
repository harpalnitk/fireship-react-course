import {Route} from 'react-router-dom';
import classes from './MainComponent.module.css';
import Welcome from './pages/Welcome';
import Products from './pages/Products';

const MainComponent = (props) => {
     return (
         <div>
            <Route path='/welcome'>
            <Welcome/>
            </Route>
            <Route path='/products'>
            <Products/>
            </Route>
         </div>
     );
        }


export default MainComponent;
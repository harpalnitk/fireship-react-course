import {Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './MainHeader';
import ProductDetail from './pages/ProductDetail';

const MainComponent = (props) => {
     return (
         <div>
            <MainHeader/>
            <main>

               {/* register all routes in app.js file  */}
               {/* switch allows each route to be displayed in separate pages
               without switch nested routes will appear in same Page */}
            <Switch>
            <Route path='/' exact>
            <Redirect to='/welcome'/>
            </Route>
            <Route path='/welcome'>
            <Welcome/>
            </Route>
            <Route path='/products' exact>
            <Products/>
            </Route>
            <Route path='/products/:productId'>
            <ProductDetail/>
            </Route>
               </Switch>

            </main>

         </div>
     );
        }


export default MainComponent;
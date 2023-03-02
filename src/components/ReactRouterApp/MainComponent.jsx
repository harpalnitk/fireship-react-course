import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './MainHeader';
import ProductDetail from './pages/ProductDetail';
import NestedRouteExample from './pages/NestedRouteExample';

const MainComponent = (props) => {
  return (
    <div>
      <MainHeader />
      <main>
        {/* register all routes in app.js file  */}
        {/* switch allows each route to be displayed in separate pages
               without switch nested routes will appear in same Page */}
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome/*' element={<Welcome />} />
          <Route path='/products' element={<Products />} />
          <Route path='/nested-route-main/*' element={<NestedRouteExample />}>
            <Route
              path='nested'
              element={<p>Nested Route Loading Different approach!</p>}
            />
          </Route>
          <Route path='/products/:productId' element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainComponent;

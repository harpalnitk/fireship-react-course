import './MainComponent.css';

import { Route, Routes } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';
import Counter from './containers/Counter';
const MainComponent = (props) => {
    return (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<ProductsPage/>}/>
            <Route path="/favorites" element={<FavoritesPage/>} />
            <Route path="/counter" element={<Counter/>} />
          </Routes>
        </>
      );
        }


export default MainComponent;
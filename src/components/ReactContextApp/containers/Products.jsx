import React from 'react';
// import { useContext } from 'react';
// import { useSelector } from 'react-redux';

import { useStore } from '../hooks-store/store';
import ProductItem from '../components/Products/ProductItem';
import './Products.css';

import { ProductsContext } from '../context/products-context';

const Products = props => {
  //const productList = useSelector(state => state.shop.products);

  //const productList = useContext(ProductsContext).products;
  const state = useStore()[0];
  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;

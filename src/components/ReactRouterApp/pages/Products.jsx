import { Link } from 'react-router-dom';
const Products = (props) => {
  return (
    <section>
      <h1>Products Page!</h1>
      <ul>
        <Link to='/products/p-1'>Product 1</Link>
        <Link to='/products/p-2'>Product 2</Link>
        <Link to='/products/p-3'>Product 3</Link>
      </ul>
    </section>
  );
};

export default Products;

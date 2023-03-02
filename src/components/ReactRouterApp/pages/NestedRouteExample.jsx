import {Link, Outlet } from 'react-router-dom';
const NestedRouteExample = (props) => {
  return (
    <section>
      <h1>The NestedRouteExample Page!</h1>
      <Link to='nested'>Nested Route Link</Link>
      <Outlet/>

    </section>
  );
};

export default NestedRouteExample;

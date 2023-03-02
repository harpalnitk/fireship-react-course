import { Route, Routes, Link } from 'react-router-dom';
const Welcome = (props) => {
  return (
    <section>
      <h1>The Welcome Page!</h1>
      <Link to='new-user'>New user</Link>
      {/* this route will be evaluated only if the welcome page is active  */}
      <Routes>
      <Route path='new-user' element={<p>Welcome new user!</p>}/>
      </Routes>

    </section>
  );
};

export default Welcome;

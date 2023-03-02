import { Route } from 'react-router-dom';
const Welcome = (props) => {
  return (
    <section>
      <h1>The Welcome Page!</h1>
      {/* this route will be evaluated only if the welcome page is active  */}
      <Route path='/welcome/new-user'>
        <p>Welcome new user!</p>
      </Route>
    </section>
  );
};

export default Welcome;

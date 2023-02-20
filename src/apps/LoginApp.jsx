import Login from '../components/LoginApp/Login/Login';
import Home from '../components/LoginApp/Home/Home';
import MainHeader from '../components/LoginApp/MainHeader/MainHeader';
import AuthContext, { AuthContextProvider } from '../store/auth-context';
import { useContext } from 'react';


function LoginApp() {

const ctx = useContext(AuthContext);


  return (
   <>
       <MainHeader/>
      <main>
        {/* loginHandler is being used directly in home so no need to use context  */}
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
   </>

    

  );
}

export default LoginApp;

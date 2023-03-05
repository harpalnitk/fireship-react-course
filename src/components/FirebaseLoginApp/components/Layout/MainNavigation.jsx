import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = ()=>{
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <NavLink to='/'>
        <div className={classes.logo}>React Auth</div>
      </NavLink>
      <nav>
        <ul>
          {!isLoggedIn && (
                 <li>
                    <NavLink to='/auth' className={navData => navData.isActive ? classes.active : '' }>Login</NavLink>
                  </li> 
                  )}
{isLoggedIn && (<>
  <li>
            <NavLink to='/profile' className={navData => navData.isActive ? classes.active : '' }>Profile</NavLink>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
</>

)}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

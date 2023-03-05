import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

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

          <li>
            <NavLink to='/profile' className={navData => navData.isActive ? classes.active : '' }>Profile</NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

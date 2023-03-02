
import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';
const MainHeader = (props) => {
     return (
         <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                       {/* <Link to="/welcome">Welcome</Link>  */}
                       <NavLink activeClassName={classes.active} to="/welcome">Welcome</NavLink> 
                    </li>
                    <li>
                        {/* if we want to highlight the active link we 
                        need to use navlink */}
                       {/* <Link to="/products">Products</Link>  */}
                       <NavLink activeClassName={classes.active} to="/products">Products</NavLink> 
                    </li>
                </ul>
            </nav>
         </header>
     );
        }


export default MainHeader;
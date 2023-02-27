
import Auth from './Auth' ;
import UserProfile from './UserProfile' ;
import { useSelector } from "react-redux";
import classes from './MainComponent.module.css';


const MainComponent = (props) => {
    const isAuth =   useSelector(state => state.auth.isAuthenticated);
     return (
         <>
            {!isAuth && <Auth/>}
            {isAuth && <UserProfile/>}
         </>
     );
        }


export default MainComponent;
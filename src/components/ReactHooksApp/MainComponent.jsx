import './MainComponent.css';
import Ingredients from './Ingredients/Ingredients';
import Auth from './Auth';
import { AuthContext } from './context/auth-context';
import { useContext } from 'react';

const MainComponent = (props) => {
  const authCtx = useContext(AuthContext);

  let content = <Auth />;
  if (authCtx.isAuth) {
    content = <Ingredients />;
  }

  return content;
};

export default MainComponent;

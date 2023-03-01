import MainComponent from '../components/ReactRouterApp/MainComponent';
import { BrowserRouter } from 'react-router-dom';

const ReactRouterApp = (props) => {
     return (
        <BrowserRouter>
          <MainComponent/>
        </BrowserRouter>
       
         
     );
        }


export default ReactRouterApp;
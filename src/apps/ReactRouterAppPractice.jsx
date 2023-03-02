
import { BrowserRouter } from 'react-router-dom';
import MainComponent from '../components/ReactRouterAppPractice/MainComponent'
//we need these styles to be available all over the app
//and not just module scoped
import  './ReactRouterAppPractice.css';

const ReactRouterAppPractice = (props) => {
     return (
        <BrowserRouter>
         <MainComponent>
         </MainComponent>
    
        </BrowserRouter>
         );
        }


export default ReactRouterAppPractice;
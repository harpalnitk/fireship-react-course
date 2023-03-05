import MainComponent from "../components/FirebaseLoginApp/MainComponent";
import { BrowserRouter } from "react-router-dom";

import './FirebaseLoginApp.css';


const FirebaseLoginApp = (props) => {
     return (
        <BrowserRouter>
         <MainComponent>
         </MainComponent>
         </BrowserRouter>
     );
        }


export default FirebaseLoginApp;
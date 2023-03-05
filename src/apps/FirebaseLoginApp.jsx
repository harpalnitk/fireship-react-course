import MainComponent from "../components/FirebaseLoginApp/MainComponent";
import { BrowserRouter } from "react-router-dom";

import './FirebaseLoginApp.css';
import { AuthContextProvider } from "../components/FirebaseLoginApp/store/auth-context";


const FirebaseLoginApp = (props) => {
     return (
      <AuthContextProvider>
       <BrowserRouter>
         <MainComponent>
         </MainComponent>
         </BrowserRouter>
      </AuthContextProvider>
 
     );
        }


export default FirebaseLoginApp;
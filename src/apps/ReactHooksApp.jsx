
import MainComponent from "../components/ReactHooksApp/MainComponent";
import AuthContextProvider from "../components/ReactHooksApp/context/auth-context";

const ReactHooksApp = (props) => {
     return (
        <AuthContextProvider>
         <MainComponent>
         </MainComponent>
        </AuthContextProvider>

     );
        }


export default ReactHooksApp;
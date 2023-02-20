
// import MementoGame from './apps/MementoGame';
import './App.css';
import ExpenseMonitoringApp from './apps/ExpenseMonitoringApp';
import CourseGoalsApp from './apps/CourseGoalsApp';
import UserListApp from './apps/UserListApp';
import LoginApp from './apps/LoginApp';
import { AuthContextProvider } from './store/auth-context';
import FoodOrderingApp from './apps/FoodOrderingApp';

// login app will run with authcontext provider wrapped around only 
{/* <AuthContextProvider>
<LoginApp/>
</AuthContextProvider> */}

function App(){
    return(




<FoodOrderingApp/>

       
    )



}

export default App;
import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn : false,
    // good practice to pass dummy functions
    onLogout: ()=>{},
    onLogin: (email,password)=>{} 
});

export const AuthContextProvider = (props)=>{
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   
     //This will run after every component re-evaluation and dependencies change
  //if dependencies array is empty
  //then it will run only one time when app starts
    useEffect(()=>{
        console.log('inside use Effect checking local storage');
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInformation === '1'){
            console.log('setting login to true');
            setIsLoggedIn(true);
        }
      },[]);

    const logoutHandler = ()=>{
        console.log('inside logout handler');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
       
    }
    const loginHandler = ()=>{
        console.log('inside login handler');
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
       
    }
    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;

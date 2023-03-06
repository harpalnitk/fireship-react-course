import React, { useState,useEffect,useCallback } from 'react';




const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

//to clear the timer if user logouts manually
let logoutTimer;

const calculateRemainingTime = (expirationTime)=>{
const currentTime = new Date().getTime(); //return current time in milliseconds
const adjExpirationTime = new Date(expirationTime).getTime();//time in future
const remainingDuration = adjExpirationTime - currentTime;
return remainingDuration;
}

const retrieveStoredToken = ()=>{
  console.log('retrieveStoredToken');
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if(remainingTime <= 60000){//less than 1 minute;1minute = 60000 milliseconds
    localStorage.removeItem('token'); 
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime
  };
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  console.log('tokenData',tokenData);
  let initialToken;
  if(tokenData)
  {
    initialToken = tokenData.token;
  }
  //possible because local storage is a synchronous operation
  const [token, setToken] = useState(initialToken);

  //!! converts truthy or falsy value to boolean
  const userIsLoggedIn = !!token;


  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    if(logoutTimer){
      clearTimeout(logoutTimer);
    }
   
  },[]);//no need to add any dependency here as local storage and cleartimeout are
  //browser functions, setToken is a state updating function
  //and logoutTimer is a global variable and outside react rendering flow



  //firebase token expires after 1 hour
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    //locla storage can store only basic primitive data
    //and token is already a string
    localStorage.setItem('token',token);
    localStorage.setItem('expirationTime',expirationTime);
    
    const remainingTime = calculateRemainingTime(expirationTime);
    //will automatically log the user out after expiration time
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

useEffect(()=>{
  if(tokenData){
    console.log(tokenData.duration)
    logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  }
},[tokenData, logoutHandler]);

  const contextValue= {
    token:token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout:logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>;
};

export default AuthContext;

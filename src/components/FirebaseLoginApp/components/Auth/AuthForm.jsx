import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

//FIREBASE REST AUTH API
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
const FIREBASE_WEB_API_KEY ='AIzaSyAgu4Z9n_x8U9QgvMzj-jpGtvtX6OfBP6Q';
//from project overview->project settings-> we_api_key

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
const authCtx = useContext(AuthContext);

const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const eneterdPassword = passwordInputRef.current.value;

    //Optional: add validation
    setIsLoading(true);
    let url;
    if(isLogin){
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_API_KEY}`
    }else{
      //signup mode
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`;
    }

    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email:enteredEmail,
        password: eneterdPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
      setIsLoading(false);
      if(res.ok){
          return res.json();
      }else{
        return res.json().then(data=>{
          //show an erro modal
          let errorMessage='Authentication Failed!';
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
         
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      //firebase return expiresIn time in seconds in String format
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate('/',{replace: true});

    }).catch(err=>{
      console.log(err);
      alert(err);
    });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Sending request...</p>}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

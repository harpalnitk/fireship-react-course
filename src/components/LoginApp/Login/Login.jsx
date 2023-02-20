import  { useState, useEffect, useReducer, useContext , useRef} from 'react';

import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../../UI/Button/Button';
import AuthContext from '../../../store/auth-context';
//reducer function can be created ouside the scope of component function
//executes whenever action is dispatched
const emailReducer = (state,action)=>{
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
 return {value:'', isValid: null};
};

const passwordReducer = (state,action)=>{
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
 return {value:'', isValid: null};
};


const Login = (props) => {

  const authCtx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value:'',
  isvalid: null
});

const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value:'',
  isvalid: null
});

//For focus functionality
const emailInputRef = useRef();
const passwordInputRef = useRef();


const {isValid: emailIsValid} = emailState;
const {isValid: passwordIsValid} = passwordState;



  //listening to every key stroke and saving data is also
  // a side-effect
  useEffect(()=>{
// we will wait for 500ms beofre setting validity; debouncing technoque
    const identifier = setTimeout(()=>{
      console.log('FORM IS VALID');
      setFormIsValid(
        passwordIsValid && emailIsValid
      );
    }, 500);

    //cleanup function of side-effects
    //this will not run once app starts up
    //but when second tome use-effect runs first clean up will run
    //and then useEffetc code will run
    return ()=>{
      console.log('CLEANUP');
      clearTimeout(identifier);
    }
    //IN CONSOLE
    //FORM IS VALID
    //enter more keys
    //CLEANUP
    //FORM IS VALID

  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
   // setEnteredEmail(event.target.value);
   dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid 
    // );
  };

  const passwordChangeHandler = (event) => {
   // setEnteredPassword(event.target.value);
   dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };
//for blur state
  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){
      emailInputRef.current.focus();
    }else {
      passwordInputRef.current.focus();
    }
    }
   
  

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
        id="email"
        type="email"
        label="E-mail"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        <Input
        ref={passwordInputRef}
        id="password"
        type="password"
        label="Password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
       
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

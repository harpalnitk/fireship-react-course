import classes from './ProfileForm.module.css';
import {useRef, useContext} from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';


const FIREBASE_WEB_API_KEY ='AIzaSyAgu4Z9n_x8U9QgvMzj-jpGtvtX6OfBP6Q';
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_WEB_API_KEY}`


const ProfileForm = () => {
const newPasswordInputRef = useRef();

const authCtx = useContext(AuthContext);
const navigate = useNavigate();

const submitHandler = (event)=>{
  event.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;
  //add validation
  fetch(URL,{
    method: 'POST',
    body: JSON.stringify({
    idToken: authCtx.token,
     password:enteredNewPassword,
     returnSecureToken: false
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res=>{
    //assumption: Always succeeds
    navigate('/',{replace: true});
    //! TODO error handling
  });

}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

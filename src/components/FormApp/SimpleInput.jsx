import classes from './SimpleInput.module.css';
import { useState, useRef } from 'react';

const SimpleInput = (props) => {
const [enteredName, setEnteredName] = useState('');
const [enteredNameIsValid,setEnteredNameIsValid] = useState(true);
const nameInputRef= useRef();

 const nameInputChangeHandler = event => {
  setEnteredName(event.target.value);
 }

 const formSubmissionhandler = event =>{
  event.preventDefault();
  //if u want to reset the enter input then state is better
  console.log(enteredName);

  if(enteredName.trim() === ''){
    setEnteredNameIsValid(false);
    return;
  }
  setEnteredNameIsValid(true);
  //if we need value only once while submitting 
  //for then useRef is better approach
  const enteredValue = nameInputRef.current.value;

  setEnteredName('');
  //below works but it is not ideal
  //nameInputRef.current.value='';
 }

 
 
  return (
    <form onSubmit={formSubmissionhandler}>
      <div className={`${classes['form-control']} ${enteredNameIsValid ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input 
        ref={nameInputRef} 
        type='text' 
        id='name' 
        onChange={nameInputChangeHandler}
        value={enteredName}/>
        {!enteredNameIsValid && <p className={classes['error-text']}>Name must not be empty</p>}
      </div>
      <div className={classes['form-actions']}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

import classes from './SimpleInput.module.css';

import useInput from '../../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.includes('@'));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }


  const formSubmissionhandler = (event) => {
    event.preventDefault();

   

    if (!formIsValid) {
      return;
    }
resetNameInput();
resetEmailInput();
  };



  return (
    <form onSubmit={formSubmissionhandler}>
      <div
        className={`${classes['form-control']} ${
          nameInputHasError ? classes.invalid : ''
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className={classes['error-text']}>Name must not be empty</p>
        )}
      </div>
      <div
        className={`${classes['form-control']} ${
          emailInputHasError ? classes.invalid : ''
        }`}
      >
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className={classes['error-text']}>Please enter a valid e-mail</p>
        )}
      </div>
      <div className={classes['form-actions']}>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

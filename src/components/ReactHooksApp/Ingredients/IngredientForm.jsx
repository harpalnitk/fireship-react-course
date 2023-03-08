import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

//react memo ensures that componnet re-renders only when the props change
const IngredientForm = React.memo((props) => {
//! RULES OF HOOKS
//1. Hooks can be used only inside components and custom-hooks
//2. hooks have to be used at root level of component i.e.
// they cannot be used inside functions in components


  //state survives re-render of this component
  //state value is preserved
  //use objects and multiple values in state when both values change together
  //else always use separate useState for each state change
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({
      title: enteredTitle,
      amount:enteredAmount
    });
  };

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              value={enteredAmount}
              onChange={(event) => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className='ingredient-form__actions'>
            {!props.loading && <button type='submit'>Add Ingredient</button>}
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

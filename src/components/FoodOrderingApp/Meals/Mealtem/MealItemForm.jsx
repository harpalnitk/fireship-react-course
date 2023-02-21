
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useRef, useState} from 'react';

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    //alternative to using ref is two way binding
    //refs will work but here we have a custom component
    //so we need to use forwardref
    const amountInputRef = useRef();

    const submitHandler = event =>{
        event.preventDefault();
        //!Note: value is always a string even if input is of type number
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length ===0 ||
         enteredAmountNumber < 1 || 
         enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
    }
     return (
         <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label='Amount' 
                input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
            />
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
         </form>
     );
        }


export default MealItemForm;
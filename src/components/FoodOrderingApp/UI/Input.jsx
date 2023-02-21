
import classes from './Input.module.css';
import React from 'react';


//wrapping component with react.forward ref
// because we want to use ref on this custom component on the parent 
// component where it is used

const Input = React.forwardRef((props, ref) => {
     return (
         <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
         <input ref={ref} {...props.input}/>
         </div>
     );
        });


export default Input;
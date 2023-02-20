//use properties in this component imperatively
// i.e. not bu using props or state management
import React, {useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

//forward ref returns a react component 
//and takes in input as a react component

//! with forward ref functionality can be exposed from child
// component to parent component
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

   const activate = ()=>{
    inputRef.current.focus();
   }

   useImperativeHandle(ref, ()=>{
    return {
        //we are exposing only focus and thus we can only use this
        focus: activate
    };
   })


     return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
     );
        });


export default Input;
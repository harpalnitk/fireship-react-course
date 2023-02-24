import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {

const dispatch = useDispatch();  
const counter = useSelector(state=> state.counter);

  const toggleCounterHandler = () => {};

  const incrementhandler =()=>{
    dispatch({type: 'increment'});
  }

  const decrementhandler =()=>{
    dispatch({type: 'decrement'});
  }

  const increaseHandler =()=>{
    dispatch({type: 'increase', amount: 5});
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <div>
        <button onClick={incrementhandler}>Increment</button>
        <button onClick={decrementhandler}>Decrement</button>
        <button onClick={increaseHandler}>IncreaseBy5</button>
        </div>
    </main>
  );
};

export default Counter;

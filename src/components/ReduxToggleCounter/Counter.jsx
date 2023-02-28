import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../../store/redux-toggle-counter-store-counter';

const Counter = () => {
  const dispatch = useDispatch();
  // const counter = useSelector(state=> state.counter);
  // const showCounter = useSelector(state=> state.showCounter);

  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  const incrementhandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementhandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // {type: UNIQUE_IDENTIFIER, payload: 10}
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
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

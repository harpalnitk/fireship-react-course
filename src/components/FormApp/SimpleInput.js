import classes from './SimpleInput.module.css';

const SimpleInput = (props) => {
  return (
    <form>
      <div className={classes['form-control']}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' />
      </div>
      <div className={classes['form-actions']}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

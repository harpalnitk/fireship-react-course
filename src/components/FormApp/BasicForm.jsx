import classes from './BasicForm.module.css';

const BasicForm = (props) => {
  return (
    <form>
      <div className={classes['control-group']}>
        <div className={classes['form-control']}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' />
        </div>
      </div>
      <div className={classes['form-control']}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div>
      <div className={classes['form-actions']}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

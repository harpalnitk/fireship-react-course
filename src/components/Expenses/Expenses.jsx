import ExpensesList from './ExpensesList';

import Card from '../UI/Card';

import ExpensesFilter from './ExpenseFilter';
import { useState } from 'react';
import ExpensesChart from './ExpensesChart';

export default function Expenses(props){
  console.log('props.items', props.items);
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = selectedYear => {
       setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter(expense=>{
    return expense.date.getFullYear().toString() === filteredYear;
  })


    
    return(
      
     
      <Card className='expenses'> 
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} /> 
      <ExpensesChart expenses={filteredExpenses}/>
       <ExpensesList items={filteredExpenses}/>

        </Card>
     
 
    );
};
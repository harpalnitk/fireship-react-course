import React from 'react';

import './IngredientList.css';

//memo used because a function is passed in and it 
//has been optimized with useCallback
const IngredientList = React.memo(props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;

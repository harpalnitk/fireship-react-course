import React, { useState,useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  //use effect runs after and for every component re-render cycle
  
  //IN SEARCH WE ARE FETCHING INGREDIENTS SO NO NEED HERE

  // useEffect(()=>{
  //   fetch(`https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json`)
  //   .then(res=> res.json())
  //   .then(resData=>{
  //     const loadedIngredients = [];
  //     for(const key in resData){
  //       loadedIngredients.push(
  //         {
  //           id: key,
  //           title: resData[key].title,
  //           amount: resData[key].amount,
  //         }
  //       );
  //     }
  //     state updation will re-render the component again
  //     and therefore outside useEffect this code will
  //     create an infinite loop
  //     setUserIngredients(loadedIngredients)
  //   })
  // },[]);// with an empty array it only run 
  // once when component renders(component did mount)

  const addIngredientHandler = (ingredient) => {
    fetch(
      `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json`,
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setUserIngredients((prevState) => [
          ...prevState,
          { id: resData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  //useCallback caches this function so that it survives
  //re-render cycles
const filteredIngredientsHandler = useCallback((filteredIngredients)=>{
  setUserIngredients(filteredIngredients);
},[])

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

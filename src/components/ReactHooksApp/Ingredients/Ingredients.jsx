import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../hooks/http-hook';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ing) => ing.id !== action.id);
    default:
  }
};

const Ingredients = () => {
  console.log('RENDERING');

  //since all these 3 states are related and inter-dependent
  //we can use reducer
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  //react wil re-render the component whenever reducer returns a new state
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  //! using custom http hook
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

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

  //useCallback used because this function is being passed to ingredient
  //form and whenever ingredients change
  //ingredient form should not be re-rendered
  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json`,
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
      //setIsLoading(true);
      // dispatchHttp({type:'SEND'});
      // fetch(
      //   `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(ingredient),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // )
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((resData) => {
      //     //setIsLoading(false);
      //     dispatchHttp({type:'RESPONSE'});
      //     // setUserIngredients((prevState) => [
      //     //   ...prevState,
      //     //   { id: resData.name, ...ingredient },
      //     // ]);
      //     dispatch({
      //       type: 'ADD',
      //       ingredient: { id: resData.name, ...ingredient },
      //     });
      //   })
      //   .catch((err) => {
      //     // setIsLoading(false);
      //     // setError(err.message);
      //     dispatchHttp({type:'ERROR',errorMessage: err.message});
      //   });
    },
    [sendRequest]
  ); //ingredient is a local argument into the function
  //not received from outside this file
  //as such need not be entered in the depndencies array

  //useHttp Hook cannot be used inside function,need to be used at root level

  useEffect(() => {
    //USE EFFECT RUNS after every component re-render cycle
    //so when loading is set to true in send request
    //this component wil re-render

    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      //if we are seinding reqExtra with delete request we will get back
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      //in add case we are not sending anything
      //so reqExtra will be null
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);
  //reqExtra is a way of sending data between component to hook
  //and then back from hook to component

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      //setIsLoading(true);
      // dispatchHttp({type:'SEND'});
      sendRequest(
        `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  //useCallback caches this function so that it survives
  //re-render cycles
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //setUserIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  //error modal should not be re-rendered again
  // as this function is being passed to it
  // const clearError = useCallback(() => {
  //   //there will only be one render cycle here, because react
  //   // batches synchronous stateupdates together
  //   //and therefore both these state updates will happen
  //   //and then component will re-render

  //   //dispatchHttp({type:'CLEAR'});
  //   //clear();
  // },[]);

  //we can either use React.memo in ingredientList file
  //or use useMemo hook in parent file
  //OR
  //we can useMemo to store any operation which takes longer to execute
  //and which we want to cache
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);
  //removeIngredientHandler will not change
  //because we are using useCallback on it

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;

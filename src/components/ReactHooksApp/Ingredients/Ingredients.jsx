import React, { useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

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

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {loading:true, error:null};
    case 'RESPONSE':
      return {...currHttpState, loading:false};
    case 'ERROR':
      return { loading:false,error:action.errorMessage};
      case 'CLEAR':
        return {...currHttpState, error:null};
    default:
      throw new Error('Should not get here');
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

  const [httpState, dispatchHttp] = useReducer(httpReducer,{loading:false, error:null});
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
    //setIsLoading(true);
    dispatchHttp({type:'SEND'});
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
        //setIsLoading(false);
        dispatchHttp({type:'RESPONSE'});
        // setUserIngredients((prevState) => [
        //   ...prevState,
        //   { id: resData.name, ...ingredient },
        // ]);
        dispatch({
          type: 'ADD',
          ingredient: { id: resData.name, ...ingredient },
        });
      })
      .catch((err) => {
        // setIsLoading(false);
        // setError(err.message);
        dispatchHttp({type:'ERROR',errorMessage: err.message});
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    //setIsLoading(true);
    dispatchHttp({type:'SEND'});
    fetch(
      `https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
       // setIsLoading(false);
       dispatchHttp({type:'RESPONSE'});
        // setUserIngredients((prevState) =>
        //   prevState.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch((err) => {
        // setIsLoading(false);

        // setError(err.message);
        dispatchHttp({type:'ERROR',errorMessage: err.message});
      });
  };

  //useCallback caches this function so that it survives
  //re-render cycles
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //setUserIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const clearError = () => {
    //there will only be one render cycle here, because react
    // batches synchronous stateupdates together
    //and therefore both these state updates will happen
    //and then component will re-render
    dispatchHttp({type:'CLEAR'});
  };

  return (
    <div className='App'>
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;

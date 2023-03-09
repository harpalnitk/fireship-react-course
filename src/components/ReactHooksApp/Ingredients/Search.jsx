import React, {useState,useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../hooks/http-hook';
import ErrorModal from '../UI/ErrorModal';

//props will change if anything in the parent component changes
const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef= useRef();

 //! using custom http hook
 const {
  isLoading,
  error,
  data,
  sendRequest,
  clear,
} = useHttp();

useEffect(()=>{
// we don't want to send server request on every keystroke,
//so we introduce a delay of 500ms
  const timer = setTimeout(()=>{
    //if value has not changed for 500ms 
    //, then only send a request to the server

    //because of how java closures work enteredFilter will be,
    // previously entered value and not the current value of input field 
    if(enteredFilter ===  inputRef.current.value){
      const query = enteredFilter.length === 0 
      ? '' 
      : `?orderBy="title"&equalTo="${enteredFilter}"`;

      sendRequest(`https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json` + query,
      'GET');
      // fetch(`https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients.json` + query)
      // .then(res=> res.json())
      // .then(resData=>{
      //   const loadedIngredients = [];
      //   for(const key in resData){
      //     loadedIngredients.push(
      //       {
      //         id: key,
      //         title: resData[key].title,
      //         amount: resData[key].amount,
      //       }
      //     );
      //   }
      //   //state updation will re-render the component again
      //   //and therefore outside useEffect this code will
      //   //create an infinite loop
      //   onLoadIngredients(loadedIngredients);
      // })
    }

  },500);
 // clean up function of useEffect, the cleanUp function runs before 
 //everything when the component is re-rendered again
 //alternatively, with no dependecies [], the clean up function
 //runs when component gets unmounted
 //useeffect always return a function (clean up is a function)
  return ()=>{
     clearTimeout(timer);
  }

},[enteredFilter, inputRef, sendRequest])
//infinite loop without useCallack because onLoadIngredients fucntion
// will change on every search because every search updates ingredient list
//in parent component, which re-renders the parent component
//and thus the function passed as prop to child component
//are also re-created


//use Effect for http Hook
useEffect(()=>{
  if(!isLoading && !error && data){
            const loadedIngredients = [];
        for(const key in data){
          loadedIngredients.push(
            {
              id: key,
              title: data[key].title,
              amount: data[key].amount,
            }
          );
        }
        //state updation will re-render the component again
        //and therefore outside useEffect this code will
        //create an infinite loop
        onLoadIngredients(loadedIngredients);
  }

},[data,isLoading,error,onLoadIngredients]);



  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input 
          ref={inputRef}
          type="text" 
          value={enteredFilter}
          onChange={event=> setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;

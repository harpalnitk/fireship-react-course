import { useState, useEffect } from 'react';
//global variables defined outside of custom Hook
//therefore every component which will use this custom hook
//will get these same values for these 3 variables

//in this case we are not only sharing hook logic
//but also data
let globalState = {};
let listeners = [];

let actions = {};

//a component which only dispatches action and not read from store 
//should not be registered as listener
//therefore as an optimization technique we use
//shouldListen prop
export const useStore = (shouldListen = true) => {
  //globalState is outside function/hook
  // so it is not re-created whenever useStore hook will be
  // re created
  const setState = useState(globalState)[1]; //need only second value from that state
  //whenever setState is called the component which uses
  //this custom hook will re-render

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      // the component using the hook will get
      //new global state and thus will be re-rendereed
      listener(globalState);
      //this means each setState(globalState) function will be called
      // for all registered components
    }
  };

  //will run only once when the component which uses this custom hook
  //is mounted; and when the component is removed the clean-up
  //function will run and setState will be removed from listeners array
  useEffect(() => {
    //whenever we call state updating function that useState gives
    //any component using our custom Hook will re-render

    if(shouldListen){
        listeners.push(setState);
    }
  

    return () => {
        if(shouldListen){
            listeners = listeners.filter((li) => li !== setState);

        }
    };
  }, [setState, shouldListen]); // react will gurantee that setState never changes

  // the react useReducer Hook also returns the same
  //but it is not built to maintain global state
  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};

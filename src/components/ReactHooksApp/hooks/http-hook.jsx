import { useReducer, useCallback } from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra:null,
    identifier:null
  }

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, extra: null, identifier:action.identifier };
    case 'RESPONSE':
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { ...currHttpState, loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not get here');
  }
};

//hook name must start with use
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(()=> dispatchHttp({type:'CLEAR'})
  ,[]);

  //because this function is being passed to a component using hook
  const sendRequest = useCallback((url, method, body, reqExtra,reqIdentifier) => {
    dispatchHttp({ type: 'SEND', identifier:reqIdentifier });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        dispatchHttp({
          type: 'RESPONSE',
          responseData: responseData,
          extra: reqExtra,
        });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', errorMessage: err.message });
      });
  }, []);
  //we can return object or primitive,array also
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier:httpState.identifier,
    clear:clear
  };
};

export default useHttp;

//each functional component will
//get a snapshot of the hook with
//component specific hook data

//which is different from functions
//in shared functions you cannot
//use useState etc. hooks

//`https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,

import QuoteForm from '../quotes/QuoteForm';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../../hooks/ReactRouterAppPractice/use-http';
import { addQuote } from '../../../lib/ReactRouterAppPractice/api';
import { useEffect } from 'react';

const NewQuote = (props) => {
   const {sendRequest,status} = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(()=>{
   if(status === 'completed'){
      navigate('/quotes');
   }
  },[status,navigate]);


  const addQuoteHandler = (quoteData) => {
   sendRequest(quoteData);
  };
  
  return <QuoteForm isLoading={status ==='pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;

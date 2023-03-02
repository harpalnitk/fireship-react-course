import QuoteList from '../quotes/QuoteList';
import useHttp from '../../../hooks/ReactRouterAppPractice/use-http';
import { getAllQuotes } from '../../../lib/ReactRouterAppPractice/api';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

const AllQuotes = (props) => {
  //true means we start in loading state
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className='centered focussed'>{error}</p>;
  }
  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;

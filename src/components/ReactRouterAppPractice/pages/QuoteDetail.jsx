import { useParams, Route } from 'react-router-dom';
import Comments from '../comments/Comments';
import HighLightedQuote from '../quotes/HighlightedQuote';
import { Link, useRouteMatch } from 'react-router-dom';
import useHttp from '../../../hooks/ReactRouterAppPractice/use-http';
import { getSingleQuote } from '../../../lib/ReactRouterAppPractice/api';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const QuoteDetail = (props) => {
  const match = useRouteMatch();
  //match.path= "/quotes/:quoteId"
  //match.url= "/quotes/q2"
  const params = useParams();
  const { quoteId } = params;
  //true : because we want to start in loading state
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  
  
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(status === 'pending'){
   return <div className="centered">
      <LoadingSpinner/>
   </div>
  }

  if(error){
   return <p className="centered">{error}</p>
  }
  if(!loadedQuote.text){
   return <p>No quote found!</p>
  }
 

  return (
    <>
      <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        {/* for disappearing the button  */}
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;

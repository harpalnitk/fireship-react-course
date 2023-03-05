// import classes from './MainComponent.module.css';
import React, {Suspense} from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import AllQuotes from './pages/AllQuotes';
// import QuoteDetail from './pages/QuoteDetail';
// import NewQuote from './pages/NewQuote';
import Layout from './layout/Layout';
// import NotFound from './pages/NotFound';
import Comments from './comments/Comments';
import LoadingSpinner from './UI/LoadingSpinner';

//for lazy loading
const NewQuote = React.lazy(()=> import ('./pages/NewQuote'));
const QuoteDetail = React.lazy(()=> import ('./pages/QuoteDetail'));
const NotFound = React.lazy(()=> import ('./pages/NotFound'));

const MainComponent = (props) => {
  return (
    <Layout>
      {/* lazy loaded components need some time to download 
      we need to show a fallback component for that duration using suspense  */}
      <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
      <Routes>
        <Route path='/' element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId' element={<QuoteDetail />}>
          <Route
            path=''
            element={
              <div className='centered'>
                <Link className='btn--flat' to={`comments`}>
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
 
    </Layout>
  );
};

export default MainComponent;

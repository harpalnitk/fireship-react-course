import classes from './MainComponent.module.css';
import { Route, Switch , Redirect} from 'react-router-dom';
import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import Layout from './layout/Layout';
import NotFound from './pages/NotFound';
const MainComponent = (props) => {
  return (
    <Layout>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes'/>
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
        <QuoteDetail/>
      </Route>
      <Route path='/new-quote'>
        <NewQuote/>
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    </Layout>

  );
};

export default MainComponent;

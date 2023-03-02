
import { useParams, Route } from "react-router-dom";
import Comments from '../comments/Comments';
import HighLightedQuote from '../quotes/HighlightedQuote';

const DUMMY_QUOTES = [
   {id:'q1',author:'Max',text:'Learning React is fun!'},
   {id:'q2',author:'Max2',text:'Learning React is fun 2!'},
   {id:'q3',author:'Max3',text:'Learning React is fun 3!'},
   {id:'q4',author:'Max4',text:'Learning React is fun 4!'},
];
const QuoteDetail = (props) => {
    const params = useParams();
    const quote =  DUMMY_QUOTES.find(quote=> quote.id === params.quoteId )
if(!quote){
   return <p>No quote found !</p>
}
     return (
        <>
<HighLightedQuote text={quote.text} author={quote.author}/>
         <Route path={`/quotes/:quoteId/comments`}>
            <Comments/>
         </Route>
        </>

     );
        }


export default QuoteDetail;
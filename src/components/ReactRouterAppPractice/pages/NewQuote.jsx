import QuoteForm from '../quotes/QuoteForm';
import { useHistory } from 'react-router-dom';



const NewQuote = (props) => {
const history = useHistory();
const addQuoteHandler = (quoteData)=>{
console.log(quoteData);
history.push('/quotes');
}
return (
<QuoteForm onAddQuote={addQuoteHandler}/>
     );
        }


export default NewQuote;
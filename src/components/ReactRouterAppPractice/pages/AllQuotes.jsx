import QuoteList from "../quotes/QuoteList";


const DUMMY_QUOTES = [
    {id:'q1',author:'Max',text:'Learning React is fun!'},
    {id:'q2',author:'Max2',text:'Learning React is fun 2!'},
    {id:'q3',author:'Max3',text:'Learning React is fun 3!'},
    {id:'q4',author:'Max4',text:'Learning React is fun 4!'},
]
const AllQuotes = (props) => {
     return (
         <QuoteList quotes={DUMMY_QUOTES}/>
     );
        }


export default AllQuotes;
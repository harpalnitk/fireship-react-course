import {
  useState,
  useReducer,
  useEffect,
  createContext,
  useContext,
} from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider,useQuery,ReactQueryDevtools, useMutation } from 'react-query';

//normal functions
function MyComponent(props) {
  //function MyComponent({icon,name}){   //props destructured
  // return <p>hey</p>;
  //when prop data changes library knows to render component
  //using a mechanism called virtual dom and more recently react fibre engine

  return (
    <>
      {props.icon}
      <h1>{props.name}</h1>
      <div>{props.icon}</div>
      {1 + 2 + 3}
    </>
  );
}
//props are immutable i.e. we cannot change prop data
function Card(props) {
  return (
    <div className='red'>
      {/* component can projetc it's innner html using props.children  */}
      {props.children}
    </div>
  );
}
//! STATES
//reacts provide a hook called useState
// ahook is a function that can be called in the top level of our component
// to use different features of the framework
function Stateful() {
  //useState creates a stateful value it will automatically re-render
  //the components that depend on it
  const [count, setCount] = useState(0); // 0 is default value of state

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

function Stateful2() {
  const [state, setState] = useState({ count: 0, user: 'Bob' }); // 0 is default value of state

  const handleClick = () => {
    setState({
      ...state,
      count: state.count + 1,
    });
  };

  return (
    <>
      <p>
        {state.user}'s count: {state.count}
      </p>
      <button onClick={handleClick}>+</button>
    </>
  );
}

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

//if state management becomes complex use reducer hook
function Stateful3() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      {/* dispatch actions to update state  */}
      {/* there are many libraries for state management like redux, recoil and mobx  */}
      <button onClick={() => dispatch({ type: 'decrement' })}> - </button>
      <button onClick={() => dispatch({ type: 'increment' })}> + </button>
    </>
  );
}
//! CONDITIONAL LOGIC
function Conditional({ count }) {
  if (count > 5) {
    return <h1>Count is greater than 5</h1>;
  } else {
    return <h1>Count is less than 5</h1>;
  }
}
function Conditional2({ count }) {
  return (
    <article>
      <nav>Navbar</nav>
      {/* if else can't be used inside jsx  .
      terniary operators can be used*/}
      {count % 2 === 0 ? <h1>Count is even</h1> : <h1>Count is odd</h1>}

      {/* if only one component or nothing is to be shown
    use logical and */}

      {count % 2 === 0 && <h1>Count is even</h1>}
      {/* be careful as values like emty string and 0 evaluates to false in js  */}
      {/* therefore use terniary operator where second condition is null  */}
      {count % 2 === 0 ? <h1>Count is even</h1> : null}
    </article>
  );
}
//! ITERATION LOOPS
function AnimalListItem(props) {
  return (
    <li>
      {props.index + 1}. {props.name}
    </li>
  );
}

function ListOfAnimals() {
  const data = [
    { id: 1, name: 'Fido' },
    { id: 2, name: 'Snowball' },
  ];
  return (
    <ul>
      {/* only below statement will give error as 
      react needs unique id for each rendered item
{data.map(({id,name})=>{<li>{name}</li>})} 
do not use index as key*/}
      {data.map(({ id, name }, index) => (
        <AnimalListItem key={id} name={name} index={index}></AnimalListItem>
      ))}
    </ul>
  );
}
//! EVENTS
function Events() {
  const clickHandler = (event) => {
    return (event, foo) => console.log(event + foo);
  };
  // event is not a regular click event but
  // A synthetic base event from react
  return <button onClick={(e) => clickHandler(e, 23)}></button>;
}

function Events2() {
  const clickHandler = (event) => {
    return (event, foo) => console.log(event + foo);
  };
  // passing event handler as prop to child component
  return <ChildComponent onClick={clickHandler} />;
}

function ChildComponent({ onClick }) {
  //child will run code that is defined in it's parent
  return <button onClick={onClick}></button>;
}

//! LIFECYCLE: every component in react has a lifecycle that we can tap into
//mount (created) -> updated(state changes) -> unmounted(destroyed)

class Lifecycle extends React.Component {
  componentDidMount() {
    //initialize
    //e.g. listen to real time datastream
  }
  componentDidUpdate() {
    //Updated
  }
  componentDidUnmount() {
    //removed
    //e.g unsubscribe from the datastream
  }
}

//functional components do not have access to these methods
//and everything is managed by useEffects hook

function Lifecycle2() {
  const [count] = useState(0);
  //ehen we run code in response to a
  //lifecycle event is considered as an effect
  //useEffect is single API to manage 3 lifecycle events
  //it takes function as a first argument and an array
  //as second argument which determines when
  // that function should run
  useEffect(() => {
    return () => console.log('Component is destroyed!');
  }, [count]);
  //function will run whenever data(count) changes
  //if array is empty it will run when component is first initialized
  //normally there is no return value in useeffect
  //however if we return a function then that function will
  // run when the component is destroyed
}

//! CONTEXT: Api share reactive data anywhere between the component tree
//since dataflow is unidirectional from parent to child
//prop drilling: when data needs to be passed from parent to grangrand child
//it needs to go through each child in the hierarchy
//this is called PROP DRILLING
//context data allows to place content somewhere in hierarchy and then all
//children will have access

const CountContext = createContext(0);

function PropDrilling() {
  const [count] = useState(0);

  return (
    // context is then placed somewhere in the component tree
    // often at the global level to provide data that can be shared across the
    // application like theme or user auth state
    <CountContext.Provider value={count}>
      <ChildComponent />
    </CountContext.Provider>
  );
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const count = useContext(CountContext); //consumes data
  return <div>{count}</div>;
}

//! ERROR BOUNDRY :
// catches error in a react application at a component level
// you can think of it as a try catch block that applies only to a component
//
function Dashboard() {}
function Orders() {}
function Main() {
  return (
    <Dashboard>
      <ErrorBoundary>
        {/* if something goes wrong in the children 
        error boundary will show fallback ui */}
        <Orders />
      </ErrorBoundary>
    </Dashboard>
  );
}
//to implement own error boundary we need to define a component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // to detect an error and update the state
  //we implement below method
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  //optionally we can implement the below lifecycle hook
  componentDidCatch(error, errorInfo) {
    console.log('something went wrong!', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Fallback UI</h1>; // render fallback UI
    }
    return this.props.children; //render default children
  }
}

//! FETCHING DATA  BASIC
//without react query

function User(props) {
  return (
    <li>
      {props.index + 1}. {props.name}
    </li>
  );
}

const UsingFetchAPI = () => {
  const [users, setUsers] = useState();

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('Users Data', data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
        <h1>Using Basic Fetch</h1>
    <ul>
      {users?.map((user, index) => 
        <User key={user?.id} name={user.name} index={index}></User>
      )}
    </ul>
    </>

  );
};

//! REACT-QUERY
// a library that simplifies how we fetch, cache and synchronize data from
// the server

// basic fetch becomes difficult for retries,caching and deduping

// 1. refetch data when user leaves and comes back on same window
// fetchOnWindowFocus: ON
// 2. Infinite scroll : useInfiniteQuery() hook
// 3. Make changes in UI instanctly on updates using: Optimistic updates
// 4. Debug data fetching logic with integrated devtools
// 5. we might not even need redux

const queryClient = new QueryClient();
//Basic Fetch Function
async function fetchCars(){
  const res = await fetch('/cars.json');
  return res.json();
}
function getUser(){}
function getCarsByUser(){}

const updateCar = ()=>{}

function Cars(){
  const {data, status, isFetching} = useQuery('cars', fetchCars);// 'cars' is a key witch allows the hook to manage data efficiently 
//FOR UPDATING DATA ON SERVER
const mutation = useMutation(updateCar, {
  //when data is written on the server
  //we can hook into it using onSuccess function
  onSuccess:()=>{
    //invalidate alerady made query and refetch
    queryClient.invalidateQueries('cars')
// we can tap into this process using isFetching
  }
})


if (status === 'loading'){
  return <p>Loading...</p>
}
//if request fails it will retry the request 3 times before showing error
if (status === 'error'){
  return <p>Error!</p>
}

return(
  <>
  <h1>Using React Query</h1>
  <ul>
    {data.map((car)=>(<li key={car.id}>{car.make}</li>))}
    {isFetching && <p>Refreshing your data...</p>}
  </ul>
  </>
  
);
}

function CarsByUser(){
//Get user first
const {data:user} = useQuery('user', getUser);

//then get user's cars
const {data:cars} = useQuery(['cars', user], getCarsByUser,{
  // this query will not execute untill user exists
  enabled: !!user,
})
}



function Main2(){
return(
  <QueryClientProvider client={queryClient}>
     {/* child component now will be able to fetch data like a pro  */}
<Cars/>
{/* for debugging in chrome  */}
{/* <ReactQueryDevtools/>  */}
  </QueryClientProvider>
  
);
}


















//! FINAL APP
function App() {
  return (
    <>
      <div>
        <MyComponent />

        {/* pass data from a parent into component using props 
      
      A prop can be primitive, string, object or even a component
      */}
        <MyComponent
          name='jeff'
          bio={{ age: 75 }}
          icon={<Conditional count='6' />}
        />
      </div>
      <div>
        <Card>
          <h1>Hello!</h1>
          <p>These are my children</p>
        </Card>
      </div>
      <div>
        <ListOfAnimals />
      </div>
      <div>
        <Stateful />
      </div>
      <div>
        <Stateful2 />
      </div>
      <div>
        <Stateful3 />
      </div>
      <div>
        <UsingFetchAPI />
      </div>
      <div>
        <Main2 />
      </div>
    </>
  );
}

//arrow functions
// const MyComponent2 = ()=>{
//   return <p>Hi</p>;
// }

//react components can also be represented with classes but developers
//prefer fucntions
// class MyComponet3 extends React.component{
//   render(){
//     return <p>Hello!</p>;
//   }
// }

export default App;

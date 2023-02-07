import { useState } from "react";

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

//reacts provide a hook called useState
// ahook is a function that can be called in the top level of our component
// to use different features of the framework
function Stateful(){
  //useState creates a stateful value it will automatically re-render
  //the components that depend on it
  const [count,setCount] = useState(0);// 0 is default value of state

  return (
    <>
    <p>{count}</p>
    <button onClick={()=> setCount(count+1)}>+</button>
    </>
  )
}

function Stateful2(){

  const [count,setCount] = useState({count:0,user:'Bob'});// 0 is default value of state

  return (
    <>
    <p>{state.count}</p>
    <button onClick={()=> setCount(count+1)}>+</button>
    </>
  )
}

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

function Events(){
  const clickHandler = (event) => {
    return (event,foo) => console.log(event+foo);
  }
  // event is not a regular click event but 
  // A synthetic base event from react
  return <button onClick={(e)=>clickHandler(e,23)}></button>


}

function Events2(){
  const clickHandler = (event) => {
    return (event,foo) => console.log(event+foo);
  }
  // passing event handler as prop to child component
  return <ChildComponent onClick={clickHandler}/>


}

function ChildComponent({onClick}){
  //child will run code that is defined in it's parent
return <button onClick={onClick}></button>
}

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
      <div><Stateful/></div>
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

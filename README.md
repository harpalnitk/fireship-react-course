# Getting Started with Create React App

> npx create-react-app fireship-react-course

### Files
# 1. index.html file in public folder for app shell
has div with id="root"

# 2. index.js file in src folder is the initial entry point that tells the react app how to startup

react by default runs in strict mode

# 3. First actual react component is defined in app.js

react library consists of two npm packages
1. react
2. react-dom

# 4. components can import images and css

# best practice to export one component per file

### To run
>npm start
for production
>npm run build

builb/static/js/main.js file

## React Developer tools chrome extension to see app tree 

# Data flow
in react is one way i.e. from parent to child


### WHY NEXTJS
react app is invisible to search engines and social media link bots
initial page load is slow

# next renders the app content first on the server and serves
fully rendered html to client, after this client side rendering takes over
just like a traditional react app

inside next app there is pages directory
where each folder represents a route

# next provides it's own router to make navigation seamless

## next performs several rendering strategies
1. SGR: Static generation : render all pages at build time
each page implements a function called getStaticProps and fetch data
and then pass the data as props to the component

all the html can then be uploaded to a storage bucket or easily cached by a CDN

e.g. blogs

2. SSR: Server Side rendering: if data changes often ; generate each html page at request time

in component getServerSideProps() function for data fetching

3. ISR: Incremental Static Regeneration: 

simply adding revalidate: 30 option to getstaticProps function react rebuilds after every 30s if a new request comes in

### VITE 
is like webpack,rollup
JS build tool for app bundling and local serving

it supports HMR: Hot module replacement
for building for production it uses rollup under the hood

plugins like VITE SSR that can do server side rendering

### React query
a library that simplifies how we fetch, cache and synchronize data from
the server

basic fetch becomes difficult for retries,caching and deduping

1. refetch data when user leaves and comes back on same window
fetchOnWindowFocus: ON
2. Infinite scroll : useInfiniteQuery() hook
3. Make changes in UI instanctly on updates using: Optimistic updates
4. Debug data fetching logic with integrated devtools
5. we might not even need redux

>npm i react-query



### MEMENTO GAME

> npx create-react-app my-app --template cra-template-pwa

# template add progressive web app features to react app
it will integarte a tool called workbox to automatically cache optimize ur app as PWA

FOR PWA file has to be hosted on https
and firebase hosting is ideal solution


The course also tells how to install PWA features in the game app but we will not use that

## use State
registers variable for each component instance for change detection

useState declaration is executed again whenever a function in component is
executed which call set function of useState

# keys in list
if ids is not used then all items in the list are rendered again
 and react sees that the entire array changed
 don't use index as key

 ### JSX Limitations

 two adjacent JSX element returned will give error
 we cannot have more than one root level JSX element in a component

 ## FRAGMENT
 <Fragment></Fragment>
 to return two elements inside a component
 
 # OR ELSE use empty tags
 <></>  which is same as freagment

 ## Reference(ref) in react

 get reference to an element e.g. in USerInputs

 refs are better if just want to read a value


 ### EFFECTS IN REACT

 effects/side-effects are used for storage,http request.
 each time state changes functional component is evaluated again
 so if http request is there in component
 it will run again and again.

 ### useReducer
 to manage to linked useStates together

 ### useContext()
 useContext() hook to fetch context
 and AuthContext.Provider
wrapping on component for wrapping context on all components
and their childrens

# Limitations
not optimized for high frequency changes

## Hooks
1. call in component function
or in Custom Hooks

2. must call react hooks at the top level of component. don't call them in nested functions or block statements

### Working of reacts
react cares about component, props,state and context
reactDOM interfaces with realDOM

react uses concept called Virtual DOM

re-evaluating component !== re-rendering the DOM

changes to real DOM are only made on differences between two REACT DOM Snapshots

# if a component is re-executed all it's children will also re-execute
if we don't want child to re-execute then export it as 

export default React.memo(ChildOutputComponent)

1. only if value of prop changes the above component will be re-executed and same for all it's child components i.e. this branch will be cut off

however if ChildOutputComponent has ( functions,arrays or objects) as input props then that will be re-executed for every re-execution of parent component.

However above exception can be handled with 
## useCallback() Hook

it saves function of our choice in react internal memory and uses same function
everytime while using React.memo

just wrap the function in this HOOk

e.g.

const toggleparagraphHandler = useCallback(()=>{
    setShowParagraph((prevShowParagraph) => ! prevShowParagraph);
},[]);
//dependencies are same as that of useEffect

 # a state is initialized only once by react unless the component is removed from the DOM which happens in case of conditional rendering of components

 # State Updates and scheduling

 any chnage in state is scheduled in react and doesn't happen immediately. however, in most cases it is very fast (instantly). However, order of state changes for same state is always guranteed
 always use function form to set state, as react will take the lates state into account OR useEffect for two separate state changes effecting a 3rd State

 # if two state updates are one after the another in one sycnhronous code block then react will batch them together into one state update

 # useMemo Hook can be used to memoize data in component 
e.g. const sortedList = props.items.sort((a,b) => a-b);

const {items} = props;
const sortedList = useMemo(()=>{ 
return items.sort((a,b) => a-b)
}, [items]);

thus, sorting in component will only run if items change

in parent also while passing array useMemo should be used
<DemoList title={lastTitle} items= {useMemo(()=> [5,3,1,10,9],[])}>


### CUSTOM HOOKS
outsource stateful logic into re-usable components


### REDUX in react

3 kind of states
1. Local State e.g. listening to user input
2. Cross component State e.g. open closed state of modal/ achieved through prop chains/prop drilling
3. App wide State e.g. User authentication

Both react context and redux help us to manange cross component
or app wide states

Disadvantages of react Context (potential):-
1. Complex Setup/Management
2. Not good for high frequency changes

> npm i redux react-redux

react-redux is wrapper of react over redux

>npm i @reduxjs/toolkit , after this u can uninstall redux because that is included in the toolkit

# action creators in react

## Thunk
thunk is a function that delays an action until later


## REACT ROUTER
>npm i react-router-dom@5

version 5 is new but in course first version 5 is used and then we migrtae to version 6
dom is browser i.e. client side code of react-router

1. register all routes with <Route> in app.jsx
2. Surround main app with      <BrowserRouter>
3. Use Link or Navlink

# without <Switch> nested routes will be displayed together on same page
i.e /products/p1

will display both
/products component
and /products/p1 component on same page


with <Switch> enclosing all Routes, first matched route will be displayed

i.e. /products if before /products/p1 then /products will be displayed

or use exact prop for exact match

# useHistory() hook for programatic navigation

VERSION 6 migration
1. <Switch> replaced with <Routes>
2. Component provided as input property of Route with element
3. No need of exact, it will always 
looks for exact match 
4. activeClassName={classes.active} gets replaced with
className={(navData)=> navData.isActive ? 'classes.active': ''}
5. Redirect changes to Navigate and is passed as element
with replace prop it replaces the current page and without replace prop  
it pushes the page
6. Nested Route also need to be wrapped in Routes
nested route need parent route with welcome/*
and the nested route in parent route component 
needs to be only relative
Link will also be relative
7. nested route can be defined in main route as inside element and outlet can be used in component to define where nested content will be placed
8. useHistory replaced with useNavigate
9. Prompt does not exist in version 6 as of now

## Lazy Loading

remove the import of the component lazy loaded and add
const NewQuote = React.lazy(()=> import ('./pages/NewQuote'));

also wrap all routes wit Suspense component to show a fallback component
while the code is being loaded

## Deplyment
ALL SPA or react apps are static and need static hosts

# Installing on firebase
> npm i -g firebase-tools


## ANIMATIONS
css transition and animations are fine
but one limitation
conditionally rendered Modal or Backdrop will show in animation
bu out animation is not shown as the component is instantly removed by JSX code

# react-transition-group package  
other alternative is 
1. react-motion
2. react-move
3. react-router-transition

  
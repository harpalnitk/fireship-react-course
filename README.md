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
react app is invisible to search engines and socila media link bots
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

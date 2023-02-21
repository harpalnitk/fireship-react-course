
import MoviesList from '../components/StarWarApp/MoviesList';
import './StarWarApp.module.css';
import { useState, useEffect, useCallback } from 'react';
import AddMovie from '../components/StarWarApp/AddMovie';

function StarWarApp() {

    const [movies,setMovies]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



     const fetchMovieHandler = useCallback( async () =>{
        //default method is GET
        setIsLoading(true);
        setError(null);
      try {
          // const res = await fetch('https://swapi.dev/api/films/');
          const res = await fetch('https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/movies.json'); //movies is name of collection in our database
          // https://fireship-blog-react-firebase-default-rtdb.firebaseio.com
          if(!res.ok){
            throw new Error('Something went wrong!!');
          }
          const data = await res.json();

          const loadedMovies = [];

          for(const key in data){
            loadedMovies.push({
              id: key,
              title: data[key].title,
              openingText: data[key].openingText,
              releaseDate: data[key].releaseDate,
            });
          }
          //  const transformedMovies = data.results.map(maovieData=>{
          //         return {
          //             id: maovieData.episode_id,
          //             title: maovieData.title,
          //             openingText: maovieData.opening_crawl,
          //             releaseDate: maovieData.release_date
          //         }
          //     })
     
        setMovies(loadedMovies);
       
      } catch (error) {
        setError(error.message);
             }
             setIsLoading(false);

    },[]);

    useEffect(()=>{
      fetchMovieHandler();
    },[fetchMovieHandler]);// if we don't use useCallback fetchMovieHandler here
// will create an infinite loop

//change rules in firebase first
async function addMovieHandler(movie){
  console.log(movie);
  const res = await fetch('https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    //takes javascript object and turns it into json format
    body: JSON.stringify(movie),
    headers:{
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log(data);
}

let content = <p>Found No Movies!</p>;

if(movies.length > 0){
  content = <MoviesList movies={movies} />
}
if (error){
  content = <p>{error}</p>;
}

if(isLoading){
content = <p>Loading...</p>;
}

  return (
    <>
    <section>
      <AddMovie onAddMovie={addMovieHandler}></AddMovie>
    </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </>
  );
}

export default StarWarApp;
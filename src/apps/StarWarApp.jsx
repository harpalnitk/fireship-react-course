
import MoviesList from '../components/StarWarApp/MoviesList';
import './StarWarApp.module.css';
import { useState } from 'react';

function StarWarApp() {

    const [movies,setMovies]= useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function  fetchMovieHandler(){
        //default method is GET
        setIsLoading(true);
        const res = await fetch('https://swapi.dev/api/films/');
        const data = await res.json();
         const transformedMovies = data.results.map(maovieData=>{
                return {
                    id: maovieData.episode_id,
                    title: maovieData.title,
                    openingText: maovieData.opening_crawl,
                    releaseDate: maovieData.release_date
                }
            })
        setMovies(transformedMovies);
        setIsLoading(false);
        
    }
//   const dummyMovies = [
//     {
//       id: 1,
//       title: 'Some Dummy Movie',
//       openingText: 'This is the opening text of the movie',
//       releaseDate: '2021-05-18',
//     },
//     {
//       id: 2,
//       title: 'Some Dummy Movie 2',
//       openingText: 'This is the second opening text of the movie',
//       releaseDate: '2021-05-19',
//     },
//   ];

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies!</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </>
  );
}

export default StarWarApp;
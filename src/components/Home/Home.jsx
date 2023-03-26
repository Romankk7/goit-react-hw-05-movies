import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getTrendingMovies } from 'shared/Api';

import css from './Home.module.css';

import MovieList from 'components/MovieList/MovieList';

const Home = () => {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await getTrendingMovies();
                setMovies(data.results);
                setLoading(false);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);
    return (
        <>
          <h2 className={css.title}>Trending movies:</h2>
    
          {loading ? (
            'Loading...'
          ) : (
            <>
              <MovieList movies={movies} location={location} />
            </>
          )}
        </>
      );
    };
    
    export default Home;
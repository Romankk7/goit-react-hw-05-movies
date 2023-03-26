import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from 'shared/Api';
import css from './MovieDetails.module.css';
const MovieDetails = () => {
const {movieId} = useParams();

const [data, setData] = useState(null);
const [loading, setLoading ] = useState(true);

useEffect(()=> {
    const getData = async () => {
        try{
            setLoading(true);
            const data = await getMovieDetails(movieId);
            setData(data);
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        } 
    };
    getData();
}, [movieId]);

const getYear = releasedata => {
    const date = new Date(releasedata)
    return date.getFullYear();
};

const getGenres = arrGenres => {
    return arrGenres.map(genre => genre.name).join(', ');
};

const location = useLocation();

const comeBack = location.state?.from ?? '/';

return (
    <>
      <Link className={css.btn} to={comeBack}>
        Go Back
      </Link>
      {loading ? (
        'Loading...'
      ) : (
        <div className={css.container}>
          <div className={css.info_wrap}>
            {data.poster_path ? (
              <img
                className={css.img}
                alt={data.original_title}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              />
            ) : (
              'NO Image'
            )}

            <div>
              <h1>
                {data.original_title} ({getYear(data.release_date)})
              </h1>
              <p className={css.description}>
                User Score: {~~(data.vote_average * 10)}%
              </p>
              <p className={css.description}>Overview</p>
              <p>{data.overview}</p>
              <p className={css.description}>Genres</p>
              <p>{getGenres(data.genres)}</p>
            </div>
          </div>

          <div>
            <ul className={css.btnList}>
              <li>
                <Link to="cast" state={{ from: comeBack }}>
                  <button className={css.castBtn}>Cast</button>
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: comeBack }}>
                  <button className={css.reviewsBtn}>Reviews</button>
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetails;

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast } from 'shared/Api';

import PropTypes from 'prop-types';

const Cast = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {movieId} = useParams();

    useEffect(()=>{
        const getData = async () => {
            try {
                setLoading(true);
                const {cast} = await getMovieCast(movieId);
                setData(cast);
                setLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [movieId]);

    return (
        <>
          {loading ? (
            'Loading...'
          ) : data && data.length > 0 ? (
            <div>
              <ul>
                {data.map(({ name, character, profile_path, id }) => (
                  <li key={id}>
                    {}
                    {profile_path ? (
                      <img
                        alt={name}
                        src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                      />
                    ) : (
                      'Image'
                    )}
    
                    <p>{name}</p>
                    <p>{character}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data found</p>
          )}
        </>
      );
    };
    
    Cast.propTypes = {
      movieId: PropTypes.number,
    };
    
    export default Cast;
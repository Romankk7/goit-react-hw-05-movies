import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'shared/Api';

const Reviews = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {movieId} = useParams();

    useEffect(()=> {
        const getData = async () => {
            try{
                setLoading(true);
                const {results} = await getMovieReviews(movieId);
                setData(results);
                setLoading(false);
            } catch(err) {
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
                {data.map(({ author, content, id }) => (
                  <li key={id}>
                    <p>{author}</p>
                    {content && content}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No reviews found</p>
          )}
        </>
      );
    };
    
    export default Reviews;
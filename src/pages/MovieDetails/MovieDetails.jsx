/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Container, ContainerAbout, List } from './MovieDetails.styled';
import defaultImg from '../../default-img.png';

export default function MovieDetails({ setId }) {
  const [filmDetails, setFilmDetails] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');
  const { poster_path, title, popularity, overview, genres = [] } = filmDetails;

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    async function fetchFilm() {
      await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
        .then(resp => {
          if (!resp.ok) {
            throw new Error(resp.status);
          }
          return resp.json();
        })
        .then(data => {
          setFilmDetails(data);
          setId(movieId);
        });
    }
    fetchFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <>
      <Link to={backLinkHref.current}>Beak</Link>
      <Container>
        <img
          src={poster_path ? IMAGE_BASE_URL + poster_path : defaultImg}
          alt={title}
          width="250px"
        />
        <div>
          <h2>{title}</h2>
          <p>Popularity: {popularity}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres:</h3>
          <List>
            {genres.map(({ name, id }) => {
              return <li key={id}>{name}</li>;
            })}
          </List>
        </div>
      </Container>

      <ContainerAbout>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </ContainerAbout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

MovieDetails.propTypes = {
  setId: PropTypes.func,
};

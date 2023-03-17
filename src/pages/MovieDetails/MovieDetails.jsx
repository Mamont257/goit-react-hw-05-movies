/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Container, ContainerAbout, List } from './MovieDetails.styled';

export function MovieDetails({ setId }) {
  const [filmDetails, setFilmDetails] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  // console.log(location);

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const { poster_path, title, popularity, overview, genres = [] } = filmDetails;

  return (
    <>
      <Link to={location.state.from.pathname}>Beak</Link>
      <Container>
        <img src={IMAGE_BASE_URL + poster_path} alt={title} width="250px" />
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
      <Outlet />
    </>
  );
}

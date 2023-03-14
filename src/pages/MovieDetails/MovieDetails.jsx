/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

export function MovieDetails() {
  const [filmDetails, setFilmDetails] = useState([]);
  const { movieId } = useParams();

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
      .then(resp => {
        // console.log(resp);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        // console.log(data);
        setFilmDetails(data);
      });
  }, [movieId]);

  const { poster_path, title, popularity, overview, genres = [] } = filmDetails;

  return (
    <>
      <img src={IMAGE_BASE_URL + poster_path} width="250px" />
      <h2>{title}</h2>
      <p>Popularity: {popularity}</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h3>Genres</h3>
      <ul>
        {genres.map(({ name }) => {
          return <li>{name}</li>;
        })}
      </ul>
      <ul>
        <li>
          <Link to="cast">Подподроды</Link>
        </li>
        <li>
          <Link to="reviews">Галерея</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

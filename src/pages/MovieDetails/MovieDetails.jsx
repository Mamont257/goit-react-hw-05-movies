import { Link, Outlet, useParams } from 'react-router-dom';

export function MovieDetails() {
  // console.log(useParams());

  const { movieId } = useParams();
  return (
    <>
      <h1>DogDetails: {movieId}</h1>
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

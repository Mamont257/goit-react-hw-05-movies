import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmSearch, setFilmSearch] = useState([]);
  const movieId = searchParams.get('movieId') ?? '';
  const location = useLocation();

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';

  useEffect(() => {
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchFilms() {
    await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${movieId}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        setFilmSearch(data.results);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ movieId: e.target.search.value });
    fetchFilms();
  }
  const updateQueryString = e => {
    if (e.target.value === '') {
      setSearchParams({});
    } else {
      setSearchParams({ movieId: e.target.value });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieId}
          name="search"
          onChange={updateQueryString}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {filmSearch.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Movies;

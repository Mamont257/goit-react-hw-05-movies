import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Home() {
  const [filmsName, setFilmsName] = useState([]);
  const location = useLocation();

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';

  useEffect(() => {
    fetch(`${API_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        // console.log(data.results);
        setFilmsName(data.results);
      });
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <ul>
        {filmsName.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
